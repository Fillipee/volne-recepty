import { Badge } from '@/components/ui/badge';
import { getSortedRecipesData } from '@/lib/recipes';
import { RecipeData } from '@/lib/types';
import { Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type RecentRecipesProps = {
    currentRecipe: RecipeData;
};

export default function RecentRecipes({ currentRecipe }: RecentRecipesProps) {
    const recipes: RecipeData[] = getSortedRecipesData(6)
        .filter((recipe) => recipe.slug !== currentRecipe.slug)
        .slice(0, 5);

    return (
        <section className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Nedávné recepty</h3>
            <ul className="space-y-4">
                {recipes.map((recipe) => (
                    <li key={recipe.slug}>
                        <RecentRecipe recipe={recipe} />
                    </li>
                ))}
            </ul>
        </section>
    );
}

type RecentRecipeProps = {
    recipe: RecipeData;
};

const RecentRecipe = ({ recipe }: RecentRecipeProps) => {
    const recipeLink = `/recepty/${recipe.slug}`;

    return (
        <Link href={recipeLink} className="grid grid-cols-[40%_1fr] gap-2">
            <Image
                src={`/images/recipes/${recipe.image}`}
                alt={recipe.title}
                width={600}
                height={400}
                className="h-24 w-full object-cover md:h-40 lg:h-24"
            />
            <hgroup className="flex flex-col">
                <h4 className="font-semibold">{recipe.title}</h4>
                {recipe.tags && (
                    <ul className="flex gap-2">
                        {recipe.tags.map((tag) => (
                            <li key={tag} className="text-sm text-muted-foreground">
                                <Badge>{tag}</Badge>
                            </li>
                        ))}
                    </ul>
                )}
                {recipe.timeToCook && (
                    <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="size-4" />
                        <span>{recipe.timeToCook}</span>
                    </p>
                )}
            </hgroup>
        </Link>
    );
};
