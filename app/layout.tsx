import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import { Toaster } from '@/components/ui/sonner';
import Footer from '@/components/footer';

const geistSans = Montserrat({
    subsets: ['latin'],
    weight: ['400', '700'],
});

export const metadata: Metadata = {
    title: {
        default: 'Žeru To',
        template: '%s | Žeru To',
    },
    description: 'Recepty na vaření, které můžete volně použít a sdílet.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="cs">
            <body className={`${geistSans.className} mt-20 antialiased`}>
                <Header />
                {children}
                <Footer />
                <Toaster />
            </body>
        </html>
    );
}
