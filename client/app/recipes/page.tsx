import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import RecipeCard from "@/components/recipes/RecipeCard";

interface Recipe {
  id: string;
  title: string;
  image: string;
  time: number;
  description: string;
  vegan: boolean;
}

async function getRecipes(): Promise<Recipe[]> {
  const response = await fetch("http://localhost:4000/recipes");

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return response.json();
}

export default async function Home() {
  const recipes = await getRecipes();

  return (
    <main>
      <div className="grid grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} />
        ))}
      </div>
    </main>
  );
}
