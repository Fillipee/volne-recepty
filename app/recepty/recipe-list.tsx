'use client';

import { useState } from 'react';
import Link from 'next/link';
import { RecipeData } from '@/lib/types';

interface TagFilterProps {
    tags: string[];
    recipes: RecipeData[];
}

export default function RecipeList({ tags, recipes }: TagFilterProps) {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const filteredRecipes = selectedTag
        ? recipes.filter((post) => post.tags && post.tags.includes(selectedTag))
        : recipes;

    return (
        <>
            <section className="mb-6">
                <div className="flex flex-wrap">
                    {tags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`mb-2 mr-2 rounded px-3 py-1 ${
                                selectedTag === tag ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                    {selectedTag && (
                        <button
                            onClick={() => setSelectedTag(null)}
                            className="mb-2 mr-2 rounded bg-red-200 px-3 py-1 text-red-800"
                        >
                            Clear Filter
                        </button>
                    )}
                </div>
            </section>
            <section>
                {filteredRecipes.map(({ slug, date, title, tags }) => (
                    <div key={slug} className="mb-8 border-b pb-4">
                        <Link href={`/recepty/${slug}`}>{title}</Link>
                        <p className="text-sm text-gray-500">{date}</p>
                        <div className="mt-2">
                            {tags?.map((tag) => (
                                <span
                                    key={tag}
                                    className="mr-2 inline-block rounded bg-blue-100 px-2 py-1 text-xs text-blue-800"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}
