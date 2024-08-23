import RecipeCard from "@/components/recipes/RecipeCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Recipes/RecipeCard",
  component: RecipeCard,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof RecipeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    recipe: {
      id: "8",
      title: "Veggie Tacos",
      image: "veggie_tacos.jpg",
      time: 25,
      description:
        "Tasty vegetarian tacos with seasoned plant-based meat and fresh toppings.",
      vegan: true,
    },
  },
};
