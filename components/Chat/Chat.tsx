/*

This code defines a Chat component for a React app, which could be used in any application that requires a chat functionality. The component is responsible for displaying chat messages, providing an input field for the user to type and send new messages, and a button to reset the chat.

The Chat component receives an array of messages, a loading state, and two functions: onSend and onReset. The onSend function is used to handle sending new messages, while the onReset function is used to clear the chat when the user clicks the "Reset Chat" button.

Within the component, individual chat messages are displayed using the ChatMessage component, which receives a single message object as its prop. If the chat is currently loading, a ChatLoader component is displayed to indicate the loading state.

The ChatInput component is responsible for providing a text input field for the user to type and send new messages. It also receives the onSend function, which is called when the user submits their message.

This Chat component could be used in various applications, such as a messaging app, a customer support chat, or a live chat feature in an online event. It would be integrated into a larger app, where other components might handle user authentication, message storage, and other functionalities required for a complete chat system.

*/

import { Message } from "@/types";
import { FC } from "react";
import { ChatInput } from "./ChatInput";
import { ChatLoader } from "./ChatLoader";
import { ChatMessage } from "./ChatMessage";
import { ResetChat } from "./ResetChat";

interface Props {
  messages: Message[];
  loading: boolean;
  onSend: (message: Message) => void;
  onReset: () => void;
}

export const Chat: FC<Props> = ({ messages, loading, onSend, onReset }) => {
  return (
    <>
      <div className="flex flex-row justify-between items-center mb-4 sm:mb-8">
        <ResetChat onReset={onReset} />
      </div>

      <div className="flex flex-col rounded-lg px-2 sm:p-4 sm:border border-neutral-300">
        {messages.map((message, index) => (
          <div
            key={index}
            className="my-1 sm:my-1.5"
          >
            <ChatMessage message={message} />
          </div>
        ))}

        {loading && (
          <div className="my-1 sm:my-1.5">
            <ChatLoader />
          </div>
        )}

        <div className="mt-4 sm:mt-8 bottom-[56px] left-0 w-full">
          <ChatInput onSend={onSend} />
        </div>
      </div>
    </>
  );
};
