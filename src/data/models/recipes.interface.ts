export interface RecipeListItem {
  id: number;
  image: string;
  imageType: "jpg" | "jpeg" | "png";
  title: string;
}
export interface IngredientMeasures {
  amount: number;
  unitLong: string;
  unitShort: string;
}

export interface RecipeIngredient {
  aisle: string;
  amount: number;
  consistency: "solid" | "liquid";
  id: number;
  image: string;
  measures: Record<string, IngredientMeasures>;
  meta: string[];
  name: string;
  original: string;
  originalName: string;
  unit: string;
}

export interface WineProductMatch {
  id: number;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  averageRating: number;
  ratingCount: number;
  score: number;
  link: string;
}

export interface WinePairing {
  pairedWines: string[];
  pairingText: string;
  productMatches: WineProductMatch[];
}

export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  servings: number;
  readyInMinutes: number;
  cookingMinutes: number;
  preparationMinutes: number;
  license: string;
  sourceName: string;
  sourceUrl: string;
  spoonacularSourceUrl: string;
  healthScore: number;
  spoonacularScore: number;
  pricePerServing: number;
  analyzedInstructions: any[]; // уточнить структуру если нужно
  cheap: boolean;
  creditsText: string;
  cuisines: string[];
  dairyFree: boolean;
  diets: string[];
  gaps: string;
  glutenFree: boolean;
  instructions: string;
  ketogenic: boolean;
  lowFodmap: boolean;
  occasions: string[];
  sustainable: boolean;
  vegan: boolean;
  vegetarian: boolean;
  veryHealthy: boolean;
  veryPopular: boolean;
  whole30: boolean;
  weightWatcherSmartPoints: number;
  dishTypes: string[];
  extendedIngredients: RecipeIngredient[];
  summary: string;
  winePairing: WinePairing;
}
