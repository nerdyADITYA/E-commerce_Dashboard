export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyle = "inline-flex justify-center items-center px-5 py-2.5 text-sm font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

    const variants = {
        primary: "border-transparent text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-lg shadow-indigo-500/25 dark:shadow-indigo-900/40 focus:ring-indigo-500 dark:focus:ring-indigo-400",
        secondary: "border-slate-200 dark:border-slate-700 border text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 focus:ring-indigo-500 dark:focus:ring-indigo-400 shadow-sm",
        danger: "border-transparent text-white bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700 shadow-lg shadow-rose-500/25 dark:shadow-rose-900/40 focus:ring-rose-500 dark:focus:ring-rose-400"
    };

    return (
        <button
            className={`${baseStyle} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
