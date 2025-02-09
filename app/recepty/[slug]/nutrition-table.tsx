export default function NutritionTable() {
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
                    <tr className="border-b border-border">
                        <td className="pt-2 text-muted-foreground">Kalorie</td>
                        <td className="pt-2 text-right font-semibold">200</td>
                    </tr>
                    <tr className="border-b border-border">
                        <td className="pt-2 text-muted-foreground">Tuky</td>
                        <td className="pt-2 text-right font-semibold">10g</td>
                    </tr>
                    <tr className="border-b border-border">
                        <td className="pt-2 text-muted-foreground">Sacharidy</td>
                        <td className="pt-2 text-right font-semibold">20g</td>
                    </tr>
                    <tr className="border-b border-border">
                        <td className="pt-2 text-muted-foreground">Bílkoviny</td>
                        <td className="pt-2 text-right font-semibold">10g</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
}
