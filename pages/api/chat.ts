// Import the Message type from "@/types" module.
import { Message } from "@/types";

// Import the OpenAIStream utility from "@/utils" module.
import { OpenAIStream } from "@/utils";

// Define the configuration object for this handler with a runtime value set to "edge".
export const config = {
  runtime: "edge"
};

// Define an async function called "handler" that takes a request object as an input and returns a Promise of a Response object.
const handler = async (req: Request): Promise<Response> => {
  try {
    // Destructure the "messages" property from the request's JSON body and cast it as an object with a "messages" property of type Message[].
    const { messages } = (await req.json()) as {
      messages: Message[];
    };

    // Define the character limit for the messages to be sent.
    const charLimit = 12000;

    // Initialize the character count and an empty array for the messages to be sent.
    let charCount = 0;
    let messagesToSend = [];

    // Iterate through the messages array.
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];

      // Check if adding the message's content length to the current character count would exceed the character limit.
      if (charCount + message.content.length > charLimit) {
        // If it does, break out of the loop.
        break;
      }

      // Add the message's content length to the current character count.
      charCount += message.content.length;

      // Add the message to the messagesToSend array.
      messagesToSend.push(message);
    }

    // Use the OpenAIStream utility to process the messagesToSend array and store the result in the "stream" variable.
    const stream = await OpenAIStream(messagesToSend);

    // Return a new Response object with the stream as its content.
    return new Response(stream);
  } catch (error) {
    // If an error occurs, log the error and return a new Response object with "Error" as its content and a 500 status code.
    console.error(error);
    return new Response("Error", { status: 500 });
  }
};

// Export the handler as the default export of this module.
export default handler;
