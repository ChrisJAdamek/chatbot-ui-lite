// Import the needed React library and components
import { FC } from "react";

// Create a new Navbar component using the FC (Functional Component) type
export const Navbar: FC = () => {
  // When this component is used, it will return the following HTML structure
  return (
    // Create a div (a container for other elements) with a set of CSS classes to style it
    // The classes define the appearance and positioning of the div
    // h-[50px] and sm:h-[60px] set the height for small and large screens
    // border-b and border-neutral-300 add a border to the bottom of the div
    // py-2 and px-2 sm:px-8 add padding to the top/bottom (y-axis) and left/right (x-axis) of the div
    // items-center aligns the div's content vertically in the center
    // justify-between controls the horizontal spacing of the content
    <div className="flex h-[50px] sm:h-[60px] border-b border-neutral-300 py-2 px-2 sm:px-8 items-center justify-between">
      // Create another div with CSS classes for styling the text
      // font-bold makes the text bold
      // text-3xl sets the text size
      // flex and items-center align the content inside this div
      <div className="font-bold text-3xl flex items-center">
        // Create a link (anchor tag) with CSS classes for styling and interactivity
        // ml-2 adds left margin to the link
        // hover:opacity-50 makes the link semi-transparent when the mouse hovers over it
        // href sets the destination URL when the link is clicked
        <a
          className="ml-2 hover:opacity-50"
          href="https://code-scaffold.vercel.app"
        >
          // The text that appears for the link
          gptCodooor
        </a>
      </div>
    </div>
  );
};
