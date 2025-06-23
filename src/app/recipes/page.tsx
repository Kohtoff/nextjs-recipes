import RecipeGrid from "@/components/recipes/RecipeGrid";
import { Paginated } from "@/data/models/common.interface";

interface SearchParams {
  keyword?: string;
  cuisine?: string;
  cookingDuration?: string;
}

interface Props {
  searchParams: SearchParams;
}

const RecipesPage = async ({ searchParams }: Props) => {
  const { keyword, cuisine, cookingDuration } = await searchParams;

  const params: Record<string, string> = {};
  if (keyword) params.query = keyword;
  if (cuisine) params.cuisine = cuisine;
  if (cookingDuration) params.maxReadyTime = cookingDuration;
  if (process.env.API_KEY) params.apiKey = process.env.API_KEY;

  const recipes: Paginated<any> = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?` +
      new URLSearchParams(params),
    { next: { revalidate: 60 } }
  )
    .then((res) => res.json())
    .catch(console.log);

  return <div>
    <RecipeGrid recipes={recipes.results} />
  </div>;
};

export default RecipesPage;
