import { Badge } from '@/components/ui/badge';
import { RecipeData } from '@/lib/types';

type Props = {
    recipeData: RecipeData;
};

export default function RecipeTags({ recipeData }: Props) {
    return (
        <section className="space-y-2">
            <h4 className="text-left text-lg font-semibold">Štítky</h4>
            <div className="flex gap-2">
                {recipeData.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary">
                        {tag}
                    </Badge>
                ))}
            </div>
        </section>
    );
}
