import Image from 'next/image';
import Link from 'next/link';

export default function Categories() {
    const featuredCategories = ['Pečení', 'Zdravé', 'Rychlé recepty', 'Vegetariánské'];

    return (
        <section className="container mx-auto mb-24 max-w-screen-lg px-4">
            <h2 className="mb-8 text-center text-3xl font-bold">Prozkoumejte kategorie</h2>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {featuredCategories.map((category) => (
                    <Link
                        key={category}
                        href="#"
                        className="group relative overflow-hidden rounded-2xl shadow-xl"
                    >
                        <div className="aspect-square">
                            <Image
                                src={`/images/placeholder.png`}
                                alt={category}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/30" />
                        <h3 className="absolute bottom-4 left-4 text-xl font-semibold text-white">
                            {category}
                        </h3>
                    </Link>
                ))}
            </div>
        </section>
    );
}
