'use client';

import { useMemo, useDeferredValue, useState } from 'react';
import { RecipeData } from '@/lib/types';
import RecipeList from './recipe-list';
import Filter from './filter';
import { normalizeString } from '@/lib/utils';

type Props = {
    recipes: RecipeData[];
    tags: string[];
};

export default function Main({ recipes, tags }: Props) {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [search, setSearch] = useState('');
    const deferredSearch = useDeferredValue(search);

    const filteredRecipes = useMemo(
        () =>
            recipes.filter(
                (recipe) =>
                    (selectedTags.length === 0 || selectedTags.every((tag) => recipe.tags?.includes(tag))) &&
                    normalizeString(recipe.title).includes(normalizeString(deferredSearch)),
            ),
        [selectedTags, deferredSearch, recipes],
    );

    return (
        <main>
            <Filter
                selectedTags={selectedTags}
                search={search}
                tags={tags}
                setSelectedTags={setSelectedTags}
                setSearch={setSearch}
            />
            <RecipeList filteredRecipes={filteredRecipes} selectedTags={selectedTags} tags={tags} />
        </main>
    );
}
