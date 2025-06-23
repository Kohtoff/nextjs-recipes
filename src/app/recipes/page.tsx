import RecipeList from "@/components/recipes/RecipeList";
import LoaderSpinner from "@/components/ui/loaders/SpinnerLoader";
import { RecipeListParams } from "@/data/models/recipes.interface";
import { Suspense } from "react";

interface Props {
  searchParams: RecipeListParams;
}

const RecipesPage = async ({ searchParams }: Props) => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <Suspense
          fallback={
            <div className="w-screen h-screen flex items-center justify-center">
              <LoaderSpinner />
            </div>
          }
        >
          <RecipeList {...searchParams} />
        </Suspense>
      </div>
    </div>
  );
};

export default RecipesPage;
