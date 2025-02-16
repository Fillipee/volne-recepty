'use client';

import { Link } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { getBasePath } from '@/lib/utils';

type Props = {
    children: React.ReactNode;
    link: string;
};

export default function Copyable({ children, link }: Props) {
    const handleClick = () => {
        const fullUrl = `${window.location.origin}${getBasePath()}${link}`;

        navigator.clipboard.writeText(fullUrl);
        toast('Odaz na recept byl zkopírován do schránky.');
    };

    return (
        <div className="group flex items-center gap-2">
            {children}
            <Button
                variant="ghost"
                onClick={handleClick}
                className="h-auto rounded-full p-3 opacity-0 transition-opacity duration-100 group-hover:opacity-100 focus:opacity-100"
                aria-label="Zkopírovat odkaz na recept"
            >
                <Link />
            </Button>
        </div>
    );
}
