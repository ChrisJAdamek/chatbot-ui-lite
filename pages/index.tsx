// Import necessary components and types
import { Chat } from "@/components/Chat/Chat";
import { Footer } from "@/components/Layout/Footer";
import { Navbar } from "@/components/Layout/Navbar";
import { Message } from "@/types";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

// Define the Home component
export default function Home() {
  // Create state for messages and loading
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Create a reference for the messages end
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Define a function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Define a function to handle sending a message
  const handleSend = async (message: Message) => {
    // Add the new message to the messages list
    const updatedMessages = [...messages, message];

    // Update the messages state and set loading to true
    setMessages(updatedMessages);
    setLoading(true);

    // Make a POST request to the chat API
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: updatedMessages
      })
    });

    // Check if the response is not ok, then throw an error
    if (!response.ok) {
      setLoading(false);
      throw new Error(response.statusText);
    }

    // Get the response body
    const data = response.body;

    if (!data) {
      return;
    }

    // Set loading to false
    setLoading(false);

    // Read the response body using a reader and a decoder
    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let isFirst = true;

    // Read the response body in chunks and update the messages state accordingly
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      if (isFirst) {
        isFirst = false;
        setMessages((messages) => [
          ...messages,
          {
            role: "assistant",
            content: chunkValue
          }
        ]);
      } else {
        setMessages((messages) => {
          const lastMessage = messages[messages.length - 1];
          const updatedMessage = {
            ...lastMessage,
            content: lastMessage.content + chunkValue
          };
          return [...messages.slice(0, -1), updatedMessage];
        });
      }
    }
  };

  // Define a function to reset the chat
  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        content: `Hi there! I'm CodePup, an AI coding assistant. How can I help you?`
      }
    ]);
  };

  // Scroll to the bottom whenever the messages state changes
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize the chat with a welcome message
  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: `Hi there! I'm CodePup, an AI coding assistant. How can I help you?`
      }
    ]);
  }, []);

  // Render the Home component
  return (
    <>
      {/* Add meta information for the page */}
      <Head>
        <title>Chatbot UI</title>
        <meta
          name="description"
          content="A simple chatbot starter kit for OpenAI's chat model using Next.js, TypeScript, and Tailwind CSS."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        {/* Link the favicon for the page */}
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>

      {/* Create a layout with Navbar, Chat, and Footer components */}
      <div className="flex flex-col h-screen">
        <Navbar />

        <div className="flex-1 overflow-auto sm:px-10 pb-4 sm:pb-10">
          <div className="max-w-[800px] mx-auto mt-4 sm:mt-12">
            {/* Render the Chat component with required props */}
            <Chat
              messages={messages}
              loading={loading}
              onSend={handleSend}
              onReset={handleReset}
            />
            {/* Add a reference for scrolling to the bottom */}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
