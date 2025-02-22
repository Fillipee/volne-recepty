'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RecipeData } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn, normalizeString } from '@/lib/utils';
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
            <section>
                <h2 className="mb-2 text-xl font-semibold">Filtr</h2>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Input
                            id="recipe-name"
                            label="Název"
                            value={search}
                            onChange={handleOnSearchChange}
                        />
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
                    <div className="flex flex-wrap gap-2">
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
                    </div>
                </div>
            </section>

            <section>
                {filteredRecipes.map(({ slug, date, title, tags, image }) => (
                    <article key={slug} className="border-border grid gap-4 border-b py-4 sm:grid-cols-3">
                        <Link
                            href={`/recepty/${slug}`}
                            prefetch={false}
                            className="col-span-1 overflow-hidden"
                        >
                            <Image
                                src={`/images/recipes/${image}`}
                                alt={title}
                                width={200}
                                height={100}
                                className="h-40 w-full object-cover transition-transform hover:scale-105"
                            />
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
        </>
    );
}
