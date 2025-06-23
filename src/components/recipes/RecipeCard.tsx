import { RecipeListItem } from "@/data/models/recipes.interface";
import Image from "next/image";
import Link from "next/link";

type Props = {
  recipe: RecipeListItem;
};

const RecipeCard = ({ recipe }: Props) => {
  return (
    <article className="group relative">
      <Link href={`/recipes/${recipe.id}`}>
        <Image
          width={280}
          height={340}
          alt={recipe.title}
          src={recipe.image}
          className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
        />
        <main className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">{recipe.title}</h3>
          </div>
        </main>
      </Link>
    </article>
  );
};

export default RecipeCard;
