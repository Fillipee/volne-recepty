import { Badge } from '@/components/ui/badge';
import { getRecipesData, getSortedRecipesData } from '@/lib/recipes';
import { CalendarDays, Clock } from 'lucide-react';
import { notFound } from 'next/navigation';
import Ingredients from './ingredients';

export async function generateStaticParams() {
    const recipes = getSortedRecipesData();

    return recipes.map((post) => ({
        slug: post.slug,
    }));
}

interface PostPageProps {
    params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params;
    const recipeData = await getRecipesData(slug);

    if (!recipeData) {
        notFound();
    }

    return (
        <div className="mx-auto max-w-screen-lg p-4">
            <p className="mb-2 text-3xl font-bold">{recipeData.title}</p>

            <div className="mb-4 flex gap-6 border-b border-rose-300 pb-4">
                <div className="flex items-center gap-2">
                    <CalendarDays className="size-5" />
                    <p className="text-sm text-gray-500">{recipeData.date}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="size-5" />
                    <p className="text-sm text-gray-500">1 hodina</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_400px]">
                <article>
                    <h2 className="sr-only">{recipeData.title}</h2>
                    <div className="h-96 w-full bg-red-500"></div>

                    <Ingredients recipeData={recipeData} />

                    <div
                        className="prose mt-6"
                        dangerouslySetInnerHTML={{ __html: recipeData.contentHtml || '' }}
                    />
                </article>
                <div className="flex flex-col gap-8 p-2">
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
                    <section className="flex flex-col gap-4">
                        <h3 className="text-lg font-semibold">Nedávné recepty</h3>
                        <ul className="space-y-4">
                            <li className="grid grid-cols-[40%_1fr] gap-2">
                                <div className="h-24 bg-red-500"></div>
                                <hgroup className="flex flex-col gap-4">
                                    <h4 className="font-semibold">Green Goddes Wrap Is a Light & Simple</h4>
                                    <p className="flex items-center gap-2">
                                        <Clock className="size-5" />
                                        <span>30 minut</span>
                                    </p>
                                </hgroup>
                            </li>
                            <li className="grid grid-cols-[40%_1fr] gap-2">
                                <div className="h-24 bg-red-500"></div>
                                <hgroup className="flex flex-col gap-4">
                                    <h4 className="font-semibold">Green Goddes Wrap Is a Light & Simple</h4>
                                    <p className="flex items-center gap-2">
                                        <Clock className="size-5" />
                                        <span>30 minut</span>
                                    </p>
                                </hgroup>
                            </li>
                            <li className="grid grid-cols-[40%_1fr] gap-2">
                                <div className="h-24 bg-red-500"></div>
                                <hgroup className="flex flex-col gap-4">
                                    <h4 className="font-semibold">Green Goddes Wrap Is a Light & Simple</h4>
                                    <p className="flex items-center gap-2">
                                        <Clock className="size-5" />
                                        <span>30 minut</span>
                                    </p>
                                </hgroup>
                            </li>
                            <li className="grid grid-cols-[40%_1fr] gap-2">
                                <div className="h-24 bg-red-500"></div>
                                <hgroup className="flex flex-col gap-4">
                                    <h4 className="font-semibold">Green Goddes Wrap Is a Light & Simple</h4>
                                    <p className="flex items-center gap-2">
                                        <Clock className="size-5" />
                                        <span>30 minut</span>
                                    </p>
                                </hgroup>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
