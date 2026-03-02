import { forwardRef } from 'react';

export const Input = forwardRef(({ label, error, className = '', ...props }, ref) => {
    return (
        <div className="w-full">
            {label && <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors">{label}</label>}
            <input
                ref={ref}
                className={`appearance-none block w-full px-4 py-3 border rounded-xl shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent sm:text-sm transition-all duration-300 dark:text-white ${error ? 'border-rose-300 dark:border-rose-500/50 text-rose-900 dark:text-rose-100 focus:ring-rose-500 bg-rose-50 dark:bg-rose-500/10' : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500 dark:focus:ring-indigo-400 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800'
                    } ${className}`}
                {...props}
            />
            {error && <p className="mt-2 text-sm text-rose-500 dark:text-rose-400 font-medium">{error}</p>}
        </div>
    );
});

Input.displayName = 'Input';
