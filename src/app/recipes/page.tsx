import RecipeGrid from "@/components/recipes/RecipeGrid";
import LoaderSpinner from "@/components/ui/loaders/SpinnerLoader";
import { Paginated } from "@/data/models/common.interface";
import { RecipeListItem } from "@/data/models/recipes.interface";
import { Suspense } from "react";

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

  const recipes: Paginated<RecipeListItem> = await fetch(
    `${process.env.API_BASE_URL}/recipes/complexSearch?` +
      new URLSearchParams(params),
    { next: { revalidate: 60 } }
  )
    .then((res) => res.json())
    .catch(console.log);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <Suspense fallback={<div className="w-screen h-screen flex items-center justify-center"><LoaderSpinner /></div>}>
          <RecipeGrid recipes={recipes.results} />
        </Suspense>
      </div>
    </div>
  );
};

export default RecipesPage;
