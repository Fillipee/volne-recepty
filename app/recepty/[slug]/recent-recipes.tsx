import { Clock } from 'lucide-react';

export default function RecentRecipes() {
    return (
        <section className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Nedávné recepty</h3>
            <ul className="space-y-4">
                <RecentRecipe />
                <RecentRecipe />
                <RecentRecipe />
                <RecentRecipe />
            </ul>
        </section>
    );
}

const RecentRecipe = () => {
    return (
        <div className="grid grid-cols-[40%_1fr] gap-2">
            <div className="h-24 bg-primary"></div>
            <hgroup className="flex flex-col gap-1">
                <h4 className="font-semibold">Tvarohová bábovka</h4>
                <p className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="size-5" />
                    <span>1h 30 min</span>
                </p>
            </hgroup>
        </div>
    );
};
