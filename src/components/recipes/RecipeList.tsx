import React from "react";
import RecipeGrid from "./RecipeGrid";
import { Pagination } from "../ui/pagination";
import { getTotalPages } from "@/lib/utils";
import {
  RecipeListItem,
  RecipeListParams,
} from "@/data/models/recipes.interface";
import { Paginated } from "@/data/models/common.interface";

const ITEMS_PER_PAGE = 10;

const RecipeList = async ({
  keyword,
  cuisine,
  cookingDuration,
  page,
}: RecipeListParams) => {
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
    .catch(() => {
        // redirect user to error.tsx
        throw new Error("Error fetching recipes")
    });

  const totalPages = getTotalPages(recipes);
  return (
    <>
      <RecipeGrid recipes={recipes.results} />
      <div className="flex justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
};

export default RecipeList;
