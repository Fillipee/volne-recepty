export const dynamic = 'force-static';

import { getSortedRecipesData } from '@/lib/recipes';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const recipes = getSortedRecipesData();
    const baseUrl = 'https://zeruto.cz';

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        ...recipes.map((recipe) => ({
            url: `${baseUrl}/recepty/${recipe.slug}`,
            lastModified: new Date(recipe.date),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        })),
    ];
}
