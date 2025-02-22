import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-primary mx-auto max-w-screen-lg border-t p-4">
            <Link
                href="https://github.com/Fillipee/zeru-to"
                target="_blank"
                prefetch={false}
                className="inline-block w-fit"
            >
                <Image
                    src={'/github.svg'}
                    width={98}
                    height={96}
                    alt="Github logo"
                    className="size-8 transition-transform duration-100 hover:scale-105"
                />
            </Link>
        </footer>
    );
}
