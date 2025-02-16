import * as React from 'react';

import { cn } from '@/lib/utils';
import { Label } from './label';

function Input({ id, label, className, type, ...props }: React.ComponentProps<'input'> & { label: string }) {
    return (
        <div className="relative">
            <input
                type={type}
                data-slot="input"
                placeholder=""
                className={cn(
                    'peer border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground aria-invalid:outline-destructive/60 aria-invalid:ring-destructive/20 dark:aria-invalid:outline-destructive dark:aria-invalid:ring-destructive/50 ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 aria-invalid:outline-destructive/60 dark:aria-invalid:outline-destructive dark:aria-invalid:ring-destructive/40 aria-invalid:ring-destructive/20 aria-invalid:border-destructive/60 dark:aria-invalid:border-destructive flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-4 focus-visible:outline-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:focus-visible:ring-[3px] aria-invalid:focus-visible:outline-none md:text-sm dark:aria-invalid:focus-visible:ring-4',
                    className,
                )}
                {...props}
            />
            <LabelTest id={id} label={label} />
        </div>
    );
}

function LabelTest({ id, label, className, ...props }: React.ComponentProps<'label'> & { label: string }) {
    return (
        <Label
            htmlFor={id}
            className={cn(
                'peer-focus:secondary peer-focus:dark:secondary bg-background dark:bg-background absolute start-2 top-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4',
                className,
            )}
            {...props}
        >
            {label}
        </Label>
    );
}

export { Input };
