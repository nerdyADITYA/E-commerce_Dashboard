import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { Button } from '../components/ui/Button';
import PageTransition from '../components/layout/PageTransition';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Info } from 'lucide-react';

const Cart = () => {
    const { cart, updateQuantity, removeFromCart, cartTotal, cartItemCount } = useCart();
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => setShowToast(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    const handleCheckout = () => {
        setShowToast(true);
    };

    if (cart.length === 0) {
        return (
            <PageTransition>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300">
                    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white dark:bg-slate-900 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800 p-8 text-center relative overflow-hidden transition-colors duration-300">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-50 dark:bg-indigo-900/20 rounded-full blur-[100px] opacity-50"></div>
                        <div className="w-28 h-28 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-8 relative z-10 shadow-inner">
                            <ShoppingBag className="w-14 h-14 text-indigo-500 dark:text-indigo-400" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4 relative z-10 tracking-tight">Your cart is empty</h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-md text-lg relative z-10">
                            Looks like you haven't added any items to your cart yet. Discover our premium collection!
                        </p>
                        <Link to="/products" className="relative z-10">
                            <Button className="h-14 px-10 rounded-full text-lg shadow-indigo-500/25">
                                Start Shopping <ArrowRight className="ml-2 w-6 h-6" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-between relative overflow-hidden transition-colors duration-300">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-indigo-50 dark:bg-indigo-900/30 rounded-full blur-3xl opacity-50"></div>
                    <div className="relative z-10">
                        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Shopping Cart</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">You have {cartItemCount} item{cartItemCount !== 1 ? 's' : ''} in your cart</p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 space-y-6">
                        {cart.map(item => (
                            <div key={item.id} className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 p-5 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-8 group hover:shadow-xl hover:shadow-indigo-500/5 dark:hover:shadow-indigo-500/10 transition-all duration-300">
                                <div className="w-28 h-28 sm:w-40 sm:h-40 bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-4 flex-shrink-0 flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-700/50">
                                    <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-700 ease-in-out dark:drop-shadow-[0_4px_4px_rgba(255,255,255,0.05)]" />
                                </div>

                                <div className="flex-1 space-y-3 w-full">
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight">{item.title}</h3>
                                            <p className="text-sm font-bold text-indigo-500 dark:text-indigo-400 mt-2 uppercase tracking-widest">{item.category}</p>
                                        </div>
                                        <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-6 w-full">
                                        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 shadow-sm flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-500/50 transition-all transform active:scale-95"
                                            >
                                                <Minus className="w-5 h-5" />
                                            </button>
                                            <span className="font-bold w-8 text-center text-lg dark:text-white">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 shadow-sm flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-500/50 transition-all transform active:scale-95"
                                            >
                                                <Plus className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="flex items-center gap-2 text-sm font-semibold text-rose-500 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 px-4 py-2.5 rounded-xl transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                            <span className="hidden sm:inline">Remove</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:w-[400px] flex-shrink-0">
                        <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl shadow-indigo-500/5 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 sm:p-10 sticky top-24 transition-colors duration-300">
                            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-8 tracking-tight">Order Summary</h2>

                            <div className="space-y-5 mb-8 text-lg">
                                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                    <span>Subtotal</span>
                                    <span className="font-semibold text-slate-900 dark:text-white">${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                    <span>Shipping</span>
                                    <span className="font-bold text-emerald-500 dark:text-emerald-400">Free</span>
                                </div>
                                <div className="border-t border-slate-100 dark:border-slate-800 pt-6 flex justify-between items-center mt-6">
                                    <span className="text-xl font-bold text-slate-900 dark:text-white">Total</span>
                                    <span className="text-4xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">${cartTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <Button className="w-full h-14 rounded-2xl text-lg shadow-indigo-500/25" onClick={handleCheckout}>
                                Proceed to Checkout
                            </Button>

                            <p className="text-sm text-center text-slate-400 dark:text-slate-500 mt-6 font-medium">
                                Secure checkout powered by NexusMart
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            <div className={`fixed bottom-6 right-6 z-50 transform transition-all duration-500 ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
                <div className="bg-slate-800 dark:bg-slate-900 border border-slate-700 dark:border-slate-800 text-white px-6 py-4 rounded-2xl shadow-2xl shadow-indigo-500/20 flex items-center gap-3">
                    <div className="bg-indigo-500/20 p-2 rounded-full">
                        <Info className="w-5 h-5 text-indigo-400" />
                    </div>
                    <span className="font-medium text-slate-100">Checkout is currently under development.</span>
                </div>
            </div>
        </PageTransition>
    );
};

export default Cart;
