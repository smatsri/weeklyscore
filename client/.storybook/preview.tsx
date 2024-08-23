import React from "react";
import type { Preview } from "@storybook/react";
import "../app/globals.css"; // Ensure global styles are imported

// Import Google Fonts
import { Inter } from "next/font/google";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Create a decorator to apply the font class
const withGlobalStyles = (StoryFn: () => JSX.Element) => (
  <div
    className={`min-h-screen bg-background font-sans antialiased ${fontSans.variable}`}
  >
    <StoryFn />
  </div>
);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    direction: "rtl",
  },
  decorators: [withGlobalStyles], // Add the decorator here
};

export default preview;
