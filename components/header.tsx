import { Utensils } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="fixed top-0 z-50 h-20 w-full bg-white/50 p-4 backdrop-blur-md">
            <div className="mx-auto flex h-full max-w-screen-lg items-center justify-between">
                <h1 className="text-2xl font-bold sm:text-4xl">
                    <Link href="/" className="flex items-center gap-3">
                        <Utensils className="fill-primary stroke-primary" />
                        <span className="text-primary">Volné</span> Recepty
                    </Link>
                </h1>
                <nav>
                    <ul className="flex gap-4">
                        <li>
                            <Link
                                href="/recepty"
                                className="rounded-lg px-3 py-2 font-semibold transition-colors hover:bg-white/20"
                            >
                                Recepty
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
