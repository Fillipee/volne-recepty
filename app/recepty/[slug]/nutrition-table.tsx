export default function NutritionTable() {
    return (
        <section className="bg-muted rounded p-4">
            <table className="w-full">
                <thead>
                    <tr>
                        <th colSpan={2}>
                            <h4 className="text-left text-lg">Nutriční hodnoty</h4>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-border border-b">
                        <td className="text-muted-foreground pt-2">Kalorie</td>
                        <td className="pt-2 text-right font-semibold">200</td>
                    </tr>
                    <tr className="border-border border-b">
                        <td className="text-muted-foreground pt-2">Tuky</td>
                        <td className="pt-2 text-right font-semibold">10g</td>
                    </tr>
                    <tr className="border-border border-b">
                        <td className="text-muted-foreground pt-2">Sacharidy</td>
                        <td className="pt-2 text-right font-semibold">20g</td>
                    </tr>
                    <tr className="border-border border-b">
                        <td className="text-muted-foreground pt-2">Bílkoviny</td>
                        <td className="pt-2 text-right font-semibold">10g</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
}
