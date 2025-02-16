'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RecipeData } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn, getBasePath, normalizeString } from '@/lib/utils';
import { X } from 'lucide-react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';

interface TagFilterProps {
    tags: string[];
    recipes: RecipeData[];
}

export default function RecipeList({ tags, recipes }: TagFilterProps) {
    const [filteredRecipes, setFilteredRecipes] = useState<RecipeData[]>(recipes);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [search, setSearch] = useState('');

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
    };

    const handleOnSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        const filtered = recipes.filter(
            (recipe) =>
                (selectedTags.length === 0 || selectedTags.every((tag) => recipe.tags?.includes(tag))) &&
                normalizeString(recipe.title).includes(normalizeString(search)),
        );

        setFilteredRecipes(filtered);
    }, [selectedTags, search]);

    return (
        <>
            <section className="mb-6">
                <div className="flex items-center justify-between">
                    <h2 className="mb-2 text-xl font-semibold">Štítky</h2>
                    <Input id="recipe-name" label="Název" value={search} onChange={handleOnSearchChange} />
                </div>
                <div className="flex h-10 flex-wrap items-center gap-2">
                    {tags.map((tag) => (
                        <Badge
                            key={tag}
                            variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                            className={cn(
                                'hover:bg-primary/90 hover:text-primary-foreground cursor-pointer transition-colors',
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
                {filteredRecipes.map(({ slug, date, title, tags, image }) => (
                    <article key={slug} className="border-border flex gap-4 border-b py-4">
                        <Link href={`/recepty/${slug}`} className="overflow-hidden">
                            <Image
                                src={`${getBasePath()}/images/recipes/${image}`}
                                alt={title}
                                width={200}
                                height={100}
                                className="h-32 object-cover transition-transform hover:scale-105"
                            />
                        </Link>
                        <div>
                            <Link href={`/recepty/${slug}`} className="text-lg font-medium hover:underline">
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
        </>
    );
}
