import { notFound } from 'next/navigation';
import { CalendarDays, Clock } from 'lucide-react';

import { getRecipesData, getSortedRecipesData } from '@/lib/recipes';
import Ingredients from './ingredients';
import RecentRecipes from './recent-recipes';
import NutritionTable from './nutrition-table';
import RecipeTags from './recipe-tags';
import Copyable from '@/components/copyable';
import Image from 'next/image';
import { getBasePath } from '@/lib/utils';

export async function generateStaticParams() {
    const recipes = getSortedRecipesData();

    return recipes.map((post) => ({
        slug: post.slug,
    }));
}

interface PostPageProps {
    params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params;
    const recipeData = await getRecipesData(slug);

    if (!recipeData) {
        notFound();
    }

    return (
        <div className="mx-auto max-w-screen-lg p-4">
            <Copyable link={`/recepty/${slug}`}>
                <h2 className="mb-2 text-3xl font-bold">{recipeData.title}</h2>
            </Copyable>

            {(recipeData.date || recipeData.timeToCook) && (
                <div className="border-primary mb-4 flex gap-6 border-b pb-4">
                    {recipeData.date && (
                        <div className="text-muted-foreground flex items-center gap-2">
                            <CalendarDays className="size-5" />
                            <p className="text-sm">{new Date(recipeData.date).toLocaleDateString('cs-CZ')}</p>
                        </div>
                    )}
                    {recipeData.timeToCook && (
                        <div className="text-muted-foreground flex items-center gap-2">
                            <Clock className="size-5" />
                            <p className="text-sm">{recipeData.timeToCook}</p>
                        </div>
                    )}
                </div>
            )}

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_400px]">
                <article>
                    <Image
                        src={`${getBasePath()}/images/recipes/${recipeData.image}`}
                        alt={recipeData.title}
                        width={600}
                        height={400}
                        className="h-96 w-full object-cover"
                    />

                    <Ingredients recipeData={recipeData} />

                    <div
                        className="prose mt-6"
                        dangerouslySetInnerHTML={{ __html: recipeData.contentHtml || '' }}
                    />
                </article>
                <div className="flex flex-col gap-8 px-2 pb-2">
                    <RecipeTags recipeData={recipeData} />
                    {recipeData.nutritions && <NutritionTable recipeData={recipeData} />}
                    <RecentRecipes currentRecipe={recipeData} />
                </div>
            </div>
        </div>
    );
}
