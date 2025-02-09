import { getAllTags, getSortedRecipesData } from '@/lib/recipes';
import { RecipeData } from '@/lib/types';
import RecipeList from './recipe-list';

export default function RecipesPage() {
    const recipes: RecipeData[] = getSortedRecipesData();
    const tags: string[] = getAllTags();

    return (
        <main className="mx-auto max-w-screen-lg p-4">
            <RecipeList tags={tags} recipes={recipes} />
        </main>
    );
}
