import { getSortedRecipesData } from '@/lib/recipes';
import { RecipeData } from '@/lib/types';
import Link from 'next/link';

export default function Home() {
    const recipes: RecipeData[] = getSortedRecipesData(6);

    return (
        <main className="mx-auto max-w-screen-lg p-4">
            <h2 className="text-xl font-semibold">Nedávné recepty</h2>
            <section>
                {recipes.map((recipe) => (
                    <div key={recipe.slug} className="my-4 rounded-md border border-gray-200 p-4">
                        <h3>
                            <Link href={`/recepty/${recipe.slug}`}>{recipe.title}</Link>
                        </h3>
                        {recipe.tags && (
                            <ul className="flex gap-2">
                                {recipe.tags.map((tag) => (
                                    <li key={tag} className="text-muted-foreground text-sm">
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </section>
        </main>
    );
}
