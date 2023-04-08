// Import the needed React library and components
import { FC } from "react";

// Create a new Footer component using the FC (Functional Component) type
export const Footer: FC = () => {
  // When this component is used, it will return the following HTML structure
  return (
    // Create a div (a container for other elements) with a set of CSS classes to style it
    // The classes define the appearance and positioning of the div
    // h-[30px] and sm:h-[50px] set the height for small and large screens
    // border-t and border-neutral-300 add a border to the top of the div
    // py-2 and px-8 add padding to the top/bottom (y-axis) and left/right (x-axis) of the div
    // items-center aligns the div's content vertically in the center
    // sm:justify-between and justify-center control the horizontal alignment of the content on small and large screens
    <div className="flex h-[30px] sm:h-[50px] border-t border-neutral-300 py-2 px-8 items-center sm:justify-between justify-center"></div>
  );
};
