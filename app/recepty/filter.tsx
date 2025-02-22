'use client';

import { Dispatch, memo, SetStateAction, useCallback } from 'react';
import { X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type Props = {
    selectedTags: string[];
    search: string;
    tags: string[];
    setSelectedTags: Dispatch<SetStateAction<string[]>>;
    setSearch: Dispatch<SetStateAction<string>>;
};

const Filter = memo(({ selectedTags, search, tags, setSelectedTags, setSearch }: Props) => {
    const toggleTag = useCallback(
        (tag: string) => {
            setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
        },
        [setSelectedTags],
    );

    const handleOnSearchChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
        [setSearch],
    );

    return (
        <section>
            <h2 className="mb-2 text-xl font-semibold">Filtr</h2>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Input id="recipe-name" label="Název" value={search} onChange={handleOnSearchChange} />
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
                            aria-pressed={selectedTags.includes(tag)}
                            aria-label={`Filter by ${tag}`}
                            onKeyDown={(e) => e.key === 'Enter' && toggleTag(tag)}
                        >
                            {tag}
                            {selectedTags.includes(tag) && <X className="ml-1 h-3 w-3" />}
                        </Badge>
                    ))}
                </div>
            </div>
        </section>
    );
});

Filter.displayName = 'Filter';
export default Filter;
