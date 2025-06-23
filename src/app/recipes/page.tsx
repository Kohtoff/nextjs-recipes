import RecipeGrid from "@/components/recipes/RecipeGrid";
import LoaderSpinner from "@/components/ui/loaders/SpinnerLoader";
import { Pagination } from "@/components/ui/pagination";
import { Paginated } from "@/data/models/common.interface";
import { RecipeListItem } from "@/data/models/recipes.interface";
import { getTotalPages } from "@/lib/utils";
import { Suspense } from "react";

interface SearchParams {
  keyword?: string;
  cuisine?: string;
  cookingDuration?: string;
  page?: string;
}

interface Props {
  searchParams: SearchParams;
}

const ITEMS_PER_PAGE = 10;

const RecipesPage = async ({ searchParams }: Props) => {
  const { keyword, cuisine, cookingDuration, page } = await searchParams;
  const currentPage = Number(page) || 1;

  const params: Record<string, string> = {};
  if (keyword) params.query = keyword;
  if (cuisine) params.cuisine = cuisine;
  if (cookingDuration) params.maxReadyTime = cookingDuration;
  if (process.env.API_KEY) params.apiKey = process.env.API_KEY;
  params.offset = `${ITEMS_PER_PAGE * (currentPage - 1)}`;

  const recipes: Paginated<RecipeListItem> = await fetch(
    `${process.env.API_BASE_URL}/recipes/complexSearch?` +
      new URLSearchParams(params),
    { next: { revalidate: 60 } }
  )
    .then((res) => res.json())
    .catch(console.log);

  const totalPages = getTotalPages(recipes);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <Suspense
          fallback={
            // <div className="w-screen h-screen flex items-center justify-center">
              <LoaderSpinner />
            // </div>
          }
        >
          <RecipeGrid recipes={recipes.results} />
          <div className="flex justify-center">
            <Pagination totalPages={totalPages} />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default RecipesPage;
