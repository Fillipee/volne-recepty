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
            <div className="bg-primary h-24"></div>
            <hgroup className="flex flex-col gap-4">
                <h4 className="font-semibold">Green Goddes Wrap Is a Light & Simple</h4>
                <p className="flex items-center gap-2">
                    <Clock className="size-5" />
                    <span>30 minut</span>
                </p>
            </hgroup>
        </div>
    );
};
