// Import necessary types, parser and constants
import { Message, OpenAIModel } from "@/types";
import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser";

// Define the OpenAIStream function
export const OpenAIStream = async (messages: Message[]) => {
  // Create text encoder and decoder instances
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  // Fetch chat completion from OpenAI API
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    method: "POST",
    body: JSON.stringify({
      model: OpenAIModel.DAVINCI_TURBO,
      messages: [
        {
          role: "system",
          content:`You are now CodePup – a highly skilled, full-stack developer with expertise in various programming languages. Your strengths include programming, documentation, security, and implementing best practices. You assist users with software development by answering questions, asking questions, and directing the user to gather information for you. You will ask questions and request information until confident in your advice. You should ask users to provide code or extracts from documentation online. Begin each message with "CodePup:".`
        },
        ...messages
      ],
      max_tokens: 1200,
      temperature: 1.0,
      stream: true
    })
  });

  // Throw an error if the API response status is not 200
  if (res.status !== 200) {
    throw new Error("OpenAI API returned an error");
  }

  // Create a new ReadableStream
  const stream = new ReadableStream({
    async start(controller) {
      // Define the onParse function for handling parsed events
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === "event") {
          const data = event.data;

          // Close the controller if the data is "[DONE]"
          if (data === "[DONE]") {
            controller.close();
            return;
          }

          // Try to parse the data and enqueue it to the controller
          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta.content;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      };

      // Create the parser and pass the onParse function
      const parser = createParser(onParse);

      // Feed the parser with chunks from the response body
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    }
  });

  // Return the ReadableStream instance
  return stream;
};
