import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { useTheme } from '../../hooks/useTheme';
import { ShoppingCart, User, LogOut, Package, Menu, X, Sun, Moon, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { storage } from '../../services/storage';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartItemCount } = useCart();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        if (!user) return;

        const updateTimer = () => {
            const session = storage.get('session');
            if (!session) {
                setTimeLeft('');
                return;
            }
            const now = new Date().getTime();
            const diff = session.expiry - now;

            if (diff <= 0) {
                logout();
                navigate('/login');
                return;
            }

            const minutes = Math.floor(diff / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            setTimeLeft(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [user, logout, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/dashboard" className="flex items-center gap-2 text-xl font-bold">
                            <Package className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent hidden sm:block tracking-tight">NexusMart</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            to="/products"
                            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${isActive('/products') ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 dark:text-indigo-400 shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                        >
                            Products
                        </Link>

                        <Link to="/cart" className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                            <ShoppingCart className="w-6 h-6" />
                            {cartItemCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-indigo-600 rounded-full shadow-sm">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>

                        <button
                            onClick={toggleTheme}
                            className="p-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-full"
                            title="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        <div className="flex items-center gap-4 ml-2 pl-4 border-l border-slate-200 dark:border-slate-800">
                            {timeLeft && (
                                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-rose-500 bg-rose-50 dark:bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-100 dark:border-rose-500/20" title="Session Time Remaining">
                                    <Clock className="w-3.5 h-3.5" />
                                    {timeLeft}
                                </div>
                            )}

                            <Link to="/profile" className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                <User className="w-5 h-5" />
                                <span className="font-semibold text-sm">{user?.name}</span>
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1 text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors p-2"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 md:hidden">
                        {timeLeft && (
                            <div className="flex items-center gap-1 text-xs font-mono font-bold text-rose-500 bg-rose-50 dark:bg-rose-500/10 px-2 py-1 rounded-lg" title="Session Time Remaining">
                                <Clock className="w-3.5 h-3.5" />
                                {timeLeft}
                            </div>
                        )}
                        <button onClick={toggleTheme} className="text-slate-600 dark:text-slate-300 p-2">
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <Link to="/cart" className="relative p-2 text-slate-600 dark:text-slate-300">
                            <ShoppingCart className="w-6 h-6" />
                            {cartItemCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-indigo-600 rounded-full shadow-sm">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 p-2"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl px-4 pt-2 pb-4 space-y-1 transition-colors duration-300">
                    <div className="mb-4 pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3 px-2">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex flex-shrink-0 items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold shadow-inner">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <div className="font-bold text-slate-900 dark:text-white leading-tight">{user?.name}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">{user?.email}</div>
                        </div>
                    </div>

                    <Link
                        to="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-3 py-2.5 rounded-xl font-semibold ${isActive('/dashboard') ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/products"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-3 py-2.5 rounded-xl font-semibold ${isActive('/products') ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                    >
                        Products
                    </Link>
                    <Link
                        to="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-3 py-2.5 rounded-xl font-semibold ${isActive('/profile') ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                    >
                        Profile
                    </Link>

                    <button
                        onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                        className="w-full text-left mt-4 px-3 py-2.5 rounded-xl font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 flex items-center gap-2 transition-colors"
                    >
                        <LogOut className="w-5 h-5" /> Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
