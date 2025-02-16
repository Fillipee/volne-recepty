import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: {
        default: 'Volné Recepty',
        template: '%s | Volné Recepty',
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
            <body className={`${geistSans.variable} ${geistMono.variable} mt-20 antialiased`}>
                <Header />
                {children}
                <Toaster />
            </body>
        </html>
    );
}
