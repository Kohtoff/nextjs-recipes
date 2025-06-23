import { Recipe } from "@/data/models/recipes.interface";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

const RecipePage = async ({ params }: { params: { id: string } }) => {
  const recipe: Recipe = await fetch(
    `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.API_KEY}`
  )
    .then((res) => res.json())
    .catch(console.log);

  if (!recipe) notFound();

  return (
      <div className="bg-white">
        <div className="pt-6">
          {/* Recipe info */}
          <div className="px-2 mx-auto mt-6 max-w-2xl sm:px-6 grid lg:max-w-7xl md:grid-cols-2 gap-8 lg:px-8">
            <div className="size-full relative rounded-lg object-cover">
              <Image
                fill
                alt={recipe.title}
                src={recipe.image}
                objectFit="contain"
              />
            </div>
            <div className="lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {recipe.title}
              </h1>
              <h2 className="text-lg font-bold tracking-tight text-gray-500 sm:text-xl">
                {recipe.cuisines}
              </h2>

              {/* Ingredients */}
              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Ingredients
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {recipe.extendedIngredients.map((ingredient) => (
                      <li key={ingredient.id} className="text-gray-400">
                        <span className="text-gray-600">
                          {ingredient.name as string}
                        </span>{" "}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:max-w-7xl lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
            <div className="lg:pr-8 lg:pb-16">
              <div>
                <h3 className="mb-4 font-bold">Instructions</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {recipe.instructions}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default RecipePage;
