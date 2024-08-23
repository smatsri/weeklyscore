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

interface Recipe {
  id: string;
  title: string;
  image: string;
  time: number;
  description: string;
  vegan: boolean;
}

type Props = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: Props) {
  return (
    <Card key={recipe.id} className="flex flex-col justify-between">
      <CardHeader className="flex-row gap-4 items-center">
        <Avatar>
          <AvatarImage src={`/img/${recipe.image}`} alt="recipe img" />
          <AvatarFallback>
            {recipe.title.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{recipe.title}</CardTitle>
          <CardDescription>{recipe.time} mins to cook.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p>{recipe.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>View Recipe</Button>
        {recipe.vegan && <Badge variant="secondary">Vegan!</Badge>}
      </CardFooter>
    </Card>
  );
}
