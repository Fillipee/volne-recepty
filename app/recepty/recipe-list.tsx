'use client';

import Link from 'next/link';
import { memo } from 'react';
import { RecipeData } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

type TagFilterProps = {
    filteredRecipes: RecipeData[];
    selectedTags: string[];
    tags: string[];
};

const RecipeList = memo(({ filteredRecipes, selectedTags }: TagFilterProps) => {
    return (
        <section>
            {filteredRecipes.map(({ slug, date, title, tags, image }) => (
                <article key={slug} className="border-border grid gap-4 border-b py-4 sm:grid-cols-3">
                    <Link href={`/recepty/${slug}`} prefetch={false} className="col-span-1 overflow-hidden">
                        <div className="relative h-40 w-full">
                            <Image
                                src={`/images/recipes/${image}`}
                                alt={title}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover transition-transform hover:scale-105"
                            />
                        </div>
                    </Link>
                    <div>
                        <Link
                            href={`/recepty/${slug}`}
                            prefetch={false}
                            className="text-lg font-medium hover:underline"
                        >
                            {title}
                        </Link>
                        <p className="text-muted-foreground mt-1 text-sm">
                            {new Date(date).toLocaleDateString('cs-CZ')}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {tags?.map((tag) => (
                                <Badge
                                    key={tag}
                                    variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                                    className="transition-colors"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </article>
            ))}
        </section>
    );
});

RecipeList.displayName = 'RecipeList';
export default RecipeList;
