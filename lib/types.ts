export type RecipeData = {
    slug: string;
    title: string;
    date: string;
    image: string;
    timeToCook?: string;
    tags?: string[];
    ingredients?: Ingredient[];
    nutritions?: Nutrition[];
    contentHtml?: string;
};

type Ingredient = string | { title: string; items: string[] };

type Nutrition = {
    name: string;
    value: string;
};
