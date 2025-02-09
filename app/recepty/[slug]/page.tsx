import { notFound } from 'next/navigation';
import { CalendarDays, Clock } from 'lucide-react';

import { getRecipesData, getSortedRecipesData } from '@/lib/recipes';
import Ingredients from './ingredients';
import RecentRecipes from './recent-recipes';
import NutritionTable from './nutrition-table';
import RecipeTags from './recipe-tags';
import Copyable from '@/components/copyable';
import { getBaseUrl } from '@/lib/utils';
import { format } from 'date-fns';

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

    const link = `${getBaseUrl()}/recepty/${slug}`;

    return (
        <div className="mx-auto max-w-screen-lg p-4">
            <Copyable link={link}>
                <p className="mb-2 text-3xl font-bold">{recipeData.title}</p>
            </Copyable>

            {(recipeData.date || recipeData.timeToCook) && (
                <div className="mb-4 flex gap-6 border-b border-primary pb-4">
                    {recipeData.date && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <CalendarDays className="size-5" />
                            <p className="text-sm">{format(new Date(recipeData.date), 'd. M. Y')}</p>
                        </div>
                    )}
                    {recipeData.timeToCook && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="size-5" />
                            <p className="text-sm">{recipeData.timeToCook}</p>
                        </div>
                    )}
                </div>
            )}

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_400px]">
                <article>
                    <h2 className="sr-only">{recipeData.title}</h2>
                    <div className="h-96 w-full bg-primary"></div>

                    <Ingredients recipeData={recipeData} />

                    <div
                        className="prose mt-6"
                        dangerouslySetInnerHTML={{ __html: recipeData.contentHtml || '' }}
                    />
                </article>
                <div className="flex flex-col gap-8 p-2">
                    <RecipeTags recipeData={recipeData} />
                    {recipeData.nutritions && <NutritionTable recipeData={recipeData} />}
                    <RecentRecipes />
                </div>
            </div>
        </div>
    );
}
