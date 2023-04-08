// Import the global CSS styles
import "@/styles/globals.css";

// Import the types for Next.js AppProps
import type { AppProps } from "next/app";

// Import the Inter font from the Google Fonts API
import { Inter } from "next/font/google";

// Create a font object using the Inter font, specifying the "latin" subset
const inter = Inter({ subsets: ["latin"] });

// Define the main App component, which takes the "Component" and "pageProps" properties
export default function App({ Component, pageProps }: AppProps<{}>) {
  // Return the main structure of the app
  return (
    // Use the "main" HTML element and set the className to use the imported Inter font
    <main className={inter.className}>
      // Render the passed "Component" and pass along the received "pageProps"
      <Component {...pageProps} />
    </main>
  );
}
