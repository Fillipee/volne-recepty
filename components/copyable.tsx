'use client';

import { Link } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

type Props = {
    children: React.ReactNode;
    link: string;
};

export default function Copyable({ children, link }: Props) {
    const handleClick = () => {
        navigator.clipboard.writeText(link);
        toast('Odaz na recept byl zkopírován do schránky.');
    };

    return (
        <div className="group flex items-center gap-2">
            {children}
            <Button
                variant="ghost"
                onClick={handleClick}
                className="h-auto rounded-full p-3 opacity-0 transition-opacity duration-100 group-hover:opacity-100"
            >
                <Link />
            </Button>
        </div>
    );
}
