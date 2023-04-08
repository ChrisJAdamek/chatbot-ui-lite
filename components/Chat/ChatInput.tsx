// Import necessary components and hooks from libraries
import { Message } from "@/types";
import { IconArrowUp } from "@tabler/icons-react";
import { FC, KeyboardEvent, useEffect, useRef, useState } from "react";

// Define the properties the ChatInput component will receive
interface Props {
  onSend: (message: Message) => void;
}

// Create the ChatInput component with the specified properties
export const ChatInput: FC<Props> = ({ onSend }) => {
  // Set up a state to store the content of the message
  const [content, setContent] = useState<string>();

  // Create a reference to the textarea element
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Function to handle the change in the textarea input
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value; // Get the value from the textarea

    // Check if the message is longer than 4000 characters
    if (value.length > 4000) {
      // If it is, alert the user and stop the function
      alert("Message limit is 4000 characters");
      return;
    }

    // Update the content state with the new value
    setContent(value);
  };

  // Function to handle sending the message
  const handleSend = () => {
    // Check if there is any content to send
    if (!content) {
      // If not, alert the user and stop the function
      alert("Please enter a message");
      return;
    }
    // Call the onSend function with the message content
    onSend({ role: "user", content });
    // Clear the content state to reset the input field
    setContent("");
  };

  // Function to handle keydown events in the textarea
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Check if the Enter key was pressed without the Shift key
    if (e.key === "Enter" && !e.shiftKey) {
      // If so, prevent the default behavior and send the message
      e.preventDefault();
      handleSend();
    }
  };

  // Hook to run side effects when content changes
  useEffect(() => {
    // Check if the textarea reference exists
    if (textareaRef && textareaRef.current) {
      // Set the textarea height to fit the content
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${textareaRef.current?.scrollHeight}px`;
    }
  }, [content]);

  // Return the JSX to render the component
  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        className="min-h-[44px] rounded-lg pl-4 pr-12 py-2 w-full focus:outline-none focus:ring-1 focus:ring-neutral-300 border-2 border-neutral-200"
        style={{ resize: "none" }}
        placeholder="Type a message..."
        value={content}
        rows={1}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      // Add a send button with an arrow-up icon
      <button onClick={() => handleSend()}>
        <IconArrowUp className="absolute right-2 bottom-3 h-8 w-8 hover:cursor-pointer rounded-full p-1 bg-blue-500 text-white hover:opacity-80" />
      </button>
    </div>
  );
};
