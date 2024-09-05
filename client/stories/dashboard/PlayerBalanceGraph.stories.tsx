import PlayerBalanceGraph from "@/components/dashboard/PlayerBalanceGraph";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Dashboard/PlayerBalanceGraph",
  component: PlayerBalanceGraph,
  decorators: [
    (Story) => (
      <div className="w-1/2">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof PlayerBalanceGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
