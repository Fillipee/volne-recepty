import { getAllTags, getSortedRecipesData } from '@/lib/recipes';
import { RecipeData } from '@/lib/types';
import Main from './main';

export const metadata = {
    title: 'Recepty',
};

export default function RecipesPage() {
    const recipes: RecipeData[] = getSortedRecipesData();
    const tags: string[] = getAllTags();

    return (
        <main className="mx-auto min-h-[calc(100dvh-160px)] max-w-screen-lg p-4">
            <Main recipes={recipes} tags={tags} />
        </main>
    );
}
