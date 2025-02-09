import { notFound } from 'next/navigation';
import { CalendarDays, Clock } from 'lucide-react';

import { getRecipesData, getSortedRecipesData } from '@/lib/recipes';
import Ingredients from './ingredients';
import RecentRecipes from './recent-recipes';
import NutritionTable from './nutrition-table';
import RecipeTags from './recipe-tags';

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
            <p className="mb-2 text-3xl font-bold">{recipeData.title}</p>

            <div className="border-primary mb-4 flex gap-6 border-b pb-4">
                <div className="flex items-center gap-2">
                    <CalendarDays className="size-5" />
                    <p className="text-sm text-gray-500">{recipeData.date}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="size-5" />
                    <p className="text-sm text-gray-500">1 hodina</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_400px]">
                <article>
                    <h2 className="sr-only">{recipeData.title}</h2>
                    <div className="bg-primary h-96 w-full"></div>

                    <Ingredients recipeData={recipeData} />

                    <div
                        className="prose mt-6"
                        dangerouslySetInnerHTML={{ __html: recipeData.contentHtml || '' }}
                    />
                </article>
                <div className="flex flex-col gap-8 p-2">
                    <RecipeTags recipeData={recipeData} />
                    <NutritionTable />
                    <RecentRecipes />
                </div>
            </div>
        </div>
    );
}
