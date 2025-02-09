import { RecipeData } from '@/lib/types';

type Props = {
    recipeData: RecipeData;
};

export default function NutritionTable({ recipeData }: Props) {
    if (!recipeData.nutritions) {
        return null;
    }

    return (
        <section className="rounded bg-muted p-4">
            <table className="w-full">
                <thead>
                    <tr>
                        <th colSpan={2}>
                            <h4 className="text-left text-lg">Nutriční hodnoty</h4>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {recipeData.nutritions.map((nutrition, index) => (
                        <tr key={index} className="border-b border-border">
                            <td className="pt-2 text-muted-foreground">{nutrition.name}</td>
                            <td className="pt-2 text-right font-semibold">{nutrition.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}
