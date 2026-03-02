import { Star, ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Button } from './Button';

export const ProductCard = ({ product }) => {
    const { cart, addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const inCart = cart.some(item => item.id === product.id);

    const handleAddToCart = async () => {
        if (inCart) return;
        setIsAdding(true);
        // Micro-animation delay
        await new Promise(r => setTimeout(r, 400));
        addToCart(product);
        setIsAdding(false);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/20 transition-all duration-500 group flex flex-col h-full transform hover:-translate-y-2 translate-z-0">
            <div className="relative aspect-square overflow-hidden bg-white dark:bg-slate-800 p-6 flex items-center justify-center border-b border-slate-50 dark:border-slate-800/50">
                <img
                    src={product.image}
                    alt={product.title}
                    className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-700 ease-in-out dark:drop-shadow-[0_10px_10px_rgba(255,255,255,0.1)] mix-blend-multiply dark:mix-blend-normal"
                    loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-slate-100 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors duration-300">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    {product.rating.rate}
                </div>
            </div>

            <div className="p-6 flex flex-col flex-1 bg-white dark:bg-slate-900 transition-colors duration-300">
                <div className="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mb-3">
                    {product.category}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-xl mb-2 leading-tight">
                    {product.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 flex-1 leading-relaxed">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50 dark:border-slate-800 space-x-2">
                    <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                        ${product.price.toFixed(2)}
                    </div>
                    <Button
                        onClick={handleAddToCart}
                        disabled={inCart || isAdding}
                        variant={inCart ? "secondary" : "primary"}
                        className="rounded-xl px-5 flex-shrink-0"
                    >
                        {isAdding ? (
                            <div className="w-6 h-6 border-2 border-indigo-600/30 dark:border-indigo-400/30 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
                        ) : inCart ? (
                            <>
                                <Check className="w-5 h-5 mr-1.5 text-emerald-500 dark:text-emerald-400" />
                                Added
                            </>
                        ) : (
                            <>
                                <ShoppingCart className="w-5 h-5 mr-1.5" />
                                Add
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};
