// This is a list of different OpenAI models we can use.
// We are only using one model right now called DAVINCI_TURBO.
export enum OpenAIModel {
  DAVINCI_TURBO = "gpt-3.5-turbo"
}

// This is a blueprint to create messages. It has two parts: role and content.
// Role tells us who sent the message, like an assistant or a user.
// Content is the actual message they sent.
export interface Message {
  role: Role;      // Role can be "assistant" or "user"
  content: string; // Content is the text of the message
}

// This is a list of roles that can send messages.
// There are only two roles: assistant and user.
export type Role = "assistant" | "user";
