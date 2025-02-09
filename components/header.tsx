import { Utensils } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="mx-auto flex max-w-screen-lg items-center justify-between p-4">
            <h1 className="text-4xl font-bold">
                <Link href="/" className="flex items-center gap-3">
                    <Utensils className="fill-primary stroke-primary" />
                    <span className="text-primary">Volné</span> Recepty
                </Link>
            </h1>
            <nav>
                <ul className="flex gap-4">
                    <li>
                        <Link href="/recepty" className="font-semibold hover:underline">
                            Recepty
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
