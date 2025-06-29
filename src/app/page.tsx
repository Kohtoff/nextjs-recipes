"use client";
import Select from "@/components/ui/Select";
import { CUISINES } from "@/data/constants/cuisines";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [cuisine, setCuisine] = useState<string | undefined>();
  const [cookingDuration, setCookingDuration] = useState<string>();

  const isFormDisabled = !(keyword || cuisine || cookingDuration);

  const buildQueryParams = () => {
    const params = new URLSearchParams();
    if (keyword) params.append("keyword", keyword);
    if (cuisine) params.append("cuisine", cuisine);
    if (cookingDuration) params.append("cookingDuration", cookingDuration);
    return params.toString();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = buildQueryParams();
    router.push(`/recipes${query ? "?" + query : ""}`);
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Search
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="keyword"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Keyword
              </label>
              <div className="mt-2">
                <input
                  id="keyword"
                  name="keyword"
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <Select
              label="Cuisine"
              onChange={(value) => setCuisine(value)}
              selected={cuisine}
              options={CUISINES}
            />
            <div>
              <label
                htmlFor="cookingDuration"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Cooking duration
              </label>
              <div className="mt-2">
                <input
                  value={cookingDuration}
                  onChange={(e) => setCookingDuration(e.target.value)}
                  id="cookingDuration"
                  name="cookingDuration"
                  type="number"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <button
                disabled={isFormDisabled}
                type="submit"
                className="flex w-full disabled:grayscale justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
