import { UserLink } from "@/components/layout/header";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "layout/header/user",
  component: UserLink,
} satisfies Meta<typeof UserLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    userName: "שי",
    onSignIn: () => {},
    onSignOut: () => {},
  },
};
