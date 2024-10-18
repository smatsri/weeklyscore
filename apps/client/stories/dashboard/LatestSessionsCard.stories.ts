import LatestSessionsCard from "@/components/dashboard/LatestSessionsCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Dashboard/LatestSessionsCard",
  component: LatestSessionsCard,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LatestSessionsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    sessions: [
      { date: "10/02/2024", winnings: 450 },
      { date: "03/02/2024", winnings: 200 },
      { date: "25/01/2024", winnings: 350 },
    ],
  },
};
