import { getSortedRecipesData } from '@/lib/recipes';
import { RecipeData } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';

export default function NewestRecipes() {
    const recipes: RecipeData[] = getSortedRecipesData(6);

    return (
        <section className="container mx-auto mb-24 max-w-screen-lg px-4">
            <h2 className="mb-8 text-center text-3xl font-bold">Nejnovější recepty</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {recipes.map((recipe) => (
                    <article
                        key={recipe.slug}
                        className="group overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 hover:scale-[1.02]"
                    >
                        <Link href={`/recepty/${recipe.slug}`} className="block">
                            <div className="relative aspect-video">
                                <Image
                                    src={`/images/recipes/${recipe.image}`}
                                    alt={recipe.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="bg-white p-6">
                                <h3 className="mb-2 line-clamp-2 text-xl font-semibold">{recipe.title}</h3>
                                <div className="mb-4 flex items-center gap-2 text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>{recipe.timeToCook}</span>
                                </div>
                                {recipe.tags && (
                                    <div className="flex flex-wrap gap-2">
                                        {recipe.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full bg-accent px-3 py-1 text-xs font-medium"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    );
}
