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
            <h3 className="my-2 text-2xl font-semibold">Ingredience</h3>
            <ul className="list-inside space-y-2">
                {recipeData.ingredients?.map((ingredient, index) => {
                    if (typeof ingredient === 'string') {
                        const uniqueKey = `${ingredient}-${index}`;
                        const isChecked = checkedIngredients.includes(uniqueKey);

                        return (
                            <Ingredient
                                key={uniqueKey}
                                ingredient={ingredient}
                                isChecked={isChecked}
                                handleIngredientClick={() => handleIngredientClick(uniqueKey)}
                            />
                        );
                    }

                    return (
                        <li key={ingredient.title} className="my-2">
                            <h4 className="my-2 text-lg font-semibold">{ingredient.title}</h4>
                            <ul className="list-inside space-y-2">
                                {ingredient.items.map((subIngredient, subIndex) => {
                                    const uniqueKey = `${subIngredient}-${index}-${subIndex}`;
                                    const isChecked = checkedIngredients.includes(uniqueKey);

                                    return (
                                        <Ingredient
                                            key={uniqueKey}
                                            ingredient={subIngredient}
                                            isChecked={isChecked}
                                            handleIngredientClick={() => handleIngredientClick(uniqueKey)}
                                        />
                                    );
                                })}
                            </ul>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}

type IngredientProps = {
    ingredient: string;
    isChecked: boolean;
    handleIngredientClick: (ingredient: string) => void;
};

const Ingredient = ({ ingredient, isChecked, handleIngredientClick }: IngredientProps) => {
    return (
        <li
            key={ingredient}
            onClick={() => handleIngredientClick(ingredient)}
            className={cn(
                'flex cursor-pointer items-center gap-2',
                isChecked && 'text-muted-foreground line-through',
            )}
        >
            <Checkbox
                checked={isChecked}
                aria-label={`Označit ${ingredient} jako připravenou`}
                className="size-5"
            />
            {ingredient}
        </li>
    );
};
