import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';
import { ShoppingBag, ShoppingCart, User } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <PageTransition>
            <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300">
                <div className="bg-white dark:bg-slate-900 p-10 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 text-center sm:text-left relative overflow-hidden transition-colors duration-300">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-indigo-50 dark:bg-indigo-900/30 rounded-full blur-3xl opacity-50"></div>
                    <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight relative z-10 transition-colors duration-300">
                        Welcome back, <span className="text-indigo-600 dark:text-indigo-400">{user?.name}</span>!
                    </h1>
                    <p className="mt-3 text-xl text-slate-500 dark:text-slate-400 relative z-10">
                        Explore our latest products and manage your cart.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                    <Link to="/products" className="group bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-[2rem] shadow-lg shadow-indigo-500/20 dark:shadow-indigo-900/40 hover:shadow-2xl hover:shadow-indigo-500/40 hover:-translate-y-2 transition-all duration-500 overflow-hidden relative">
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <ShoppingBag className="w-12 h-12 text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 relative z-10" />
                        <h2 className="text-2xl font-bold text-white mb-2 relative z-10">Browse Products</h2>
                        <p className="text-indigo-100 relative z-10">Discover our premium selection of items</p>
                    </Link>

                    <Link to="/cart" className="group bg-gradient-to-br from-emerald-400 to-teal-500 p-8 rounded-[2rem] shadow-lg shadow-emerald-500/20 dark:shadow-emerald-900/40 hover:shadow-2xl hover:shadow-emerald-500/40 hover:-translate-y-2 transition-all duration-500 overflow-hidden relative">
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <ShoppingCart className="w-12 h-12 text-white mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 relative z-10" />
                        <h2 className="text-2xl font-bold text-white mb-2 relative z-10">Your Cart</h2>
                        <p className="text-teal-50 relative z-10">View and manage your selected items</p>
                    </Link>

                    <Link to="/profile" className="group bg-gradient-to-br from-rose-400 to-orange-400 p-8 rounded-[2rem] shadow-lg shadow-rose-500/20 dark:shadow-rose-900/40 hover:shadow-2xl hover:shadow-rose-500/40 hover:-translate-y-2 transition-all duration-500 overflow-hidden relative">
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <User className="w-12 h-12 text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 relative z-10" />
                        <h2 className="text-2xl font-bold text-white mb-2 relative z-10">Profile Settings</h2>
                        <p className="text-rose-100 relative z-10">Update your personal information</p>
                    </Link>
                </div>
            </div>
        </PageTransition>
    );
};

export default Dashboard;
