import React from "react";
import type { Preview } from "@storybook/react";
import "../app/globals.css"; // Ensure global styles are imported
import rubik from "../fonts/rubik";

// Create a decorator to apply the font class
const withGlobalStyles = (StoryFn: () => JSX.Element) => (
  <div
    className={`min-h-screen bg-background font-sans antialiased ${rubik.className} `}
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
