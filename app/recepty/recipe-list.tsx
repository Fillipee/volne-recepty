'use client';

import { useState } from 'react';
import Link from 'next/link';
import { RecipeData } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface TagFilterProps {
    tags: string[];
    recipes: RecipeData[];
}

export default function RecipeList({ tags, recipes }: TagFilterProps) {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
    };

    const filteredRecipes = recipes.filter(
        (recipe) => selectedTags.length === 0 || selectedTags.every((tag) => recipe.tags?.includes(tag)),
    );

    return (
        <>
            <section className="mb-6">
                <h2 className="mb-2 text-xl font-semibold">Štítky</h2>
                <div className="flex h-10 flex-wrap items-center gap-2">
                    {tags.map((tag) => (
                        <Badge
                            key={tag}
                            variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                            className={cn(
                                'cursor-pointer transition-colors hover:bg-primary/90 hover:text-primary-foreground',
                                selectedTags.includes(tag) && 'pr-2',
                            )}
                            onClick={() => toggleTag(tag)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && toggleTag(tag)}
                        >
                            {tag}
                            {selectedTags.includes(tag) && <X className="ml-1 h-3 w-3" />}
                        </Badge>
                    ))}

                    {selectedTags.length > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedTags([])}
                            className="text-destructive hover:text-destructive/80"
                        >
                            Obnovit ({selectedTags.length})
                        </Button>
                    )}
                </div>
            </section>

            <section>
                {filteredRecipes.map(({ slug, date, title, tags }) => (
                    <article key={slug} className="mb-8 border-b pb-4">
                        <Link href={`/recepty/${slug}`} className="text-lg font-medium hover:underline">
                            {title}
                        </Link>
                        <p className="mt-1 text-sm text-muted-foreground">
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
                    </article>
                ))}
            </section>
        </>
    );
}
