'use client';

import { useState } from 'react';
import { RecipeData } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

type Props = {
    recipeData: RecipeData;
};

export default function Ingredients({ recipeData }: Props) {
    const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);

    const handleIngredientClick = (ingredient: string) => {
        setCheckedIngredients((prev) =>
            prev.includes(ingredient) ? prev.filter((item) => item !== ingredient) : [...prev, ingredient],
        );
    };

    if (!recipeData.ingredients) {
        return null;
    }

    return (
        <section>
            <h3 className="my-2 text-2xl font-semibold">Ingredients</h3>
            <ul className="list-inside">
                {recipeData.ingredients?.map((ingredient) => {
                    const isChecked = checkedIngredients.includes(ingredient);

                    return (
                        <li
                            key={ingredient}
                            onClick={() => handleIngredientClick(ingredient)}
                            className={cn(
                                'flex cursor-pointer items-center gap-2',
                                isChecked && 'text-muted-foreground line-through',
                            )}
                        >
                            <Checkbox checked={isChecked} />
                            {ingredient}
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
