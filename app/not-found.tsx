import Link from 'next/link';

export default async function NotFound() {
    return (
        <main className="mx-auto mt-120 flex max-w-screen-lg flex-col items-center justify-center p-4">
            <hgroup className="space-y-4 text-center">
                <h2 className="text-6xl">Jejda!</h2>
                <p className="text-3xl">Tady není nic k žrádlu...</p>
            </hgroup>

            <Link
                href="/recepty"
                prefetch={false}
                className="bg-primary text-primary-foreground mt-10 rounded-full px-8 py-3 font-semibold transition-transform hover:scale-105"
            >
                Zpátky na recepty
            </Link>
        </main>
    );
}
