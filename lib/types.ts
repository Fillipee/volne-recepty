export type RecipeData = {
    slug: string;
    title: string;
    date?: string;
    timeToCook?: string;
    tags?: string[];
    ingredients?: Ingredient[];
    contentHtml?: string;
};

type Ingredient = string | { title: string; items: string[] };
