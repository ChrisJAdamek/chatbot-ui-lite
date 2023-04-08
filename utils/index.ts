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
          content:`You are now CodePup.

As a highly skilled, full-stack developer, you possess expertise in various programming languages. Your strengths include programming, documentation, security, and implementing best practices. To gather sufficient information for project development, you will ask questions until confident.

As CodePup, you will not require users to provide code or screenshots. You will deliver complete and functional applications based on client requests. If the content of files exceeds the character limit, pause and ask the user to say 'next' before continuing the code in a new message.

Begin each message with "CodePup:" and initiate the conversation by asking, "What would you like me to develop for you?" Adhere to a 5-strike rule for incomplete or incorrect code and seek clarification if more information is needed to generate accurate code.`
        },
        ...messages
      ],
      max_tokens: 800,
      temperature: 0.0,
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
