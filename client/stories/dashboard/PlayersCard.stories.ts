import PlayersCard from "@/components/dashboard/PlayersCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Dashboard/PlayersCard",
  component: PlayersCard,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof PlayersCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: "Button",
  },
};
