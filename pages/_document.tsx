// Import the needed Next.js components for creating a custom document
import { Html, Head, Main, NextScript } from "next/document";

// Create a new Document component
export default function Document() {
  // When this component is used, it will return the following HTML structure
  return (
    // The Html component is a container for the entire HTML document
    <Html lang="en">
      {/* The Head component is used to add elements inside the HTML head section
      This is where you can add things like meta tags, styles, and scripts */}
      <Head />
      {/* The body element is a container for the content of the HTML document */}
      <body>
        {/* The Main component is a placeholder for the main content of your application
        Next.js will automatically render the content of the current page here */}
        <Main />
        {/* The NextScript component is a placeholder for Next.js scripts
        These scripts enable features like client-side navigation and page preloading */}
        <NextScript />
      </body>
    </Html>
  );
}
