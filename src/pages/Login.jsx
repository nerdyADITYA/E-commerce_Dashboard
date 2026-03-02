import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import PageTransition from '../components/layout/PageTransition';
import { Package, LogIn } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        await new Promise(r => setTimeout(r, 600));

        const result = login(email, password);
        setIsLoading(false);

        if (result.success) {
            const origin = location.state?.from?.pathname || '/dashboard';
            navigate(origin, { replace: true });
        } else {
            setError(result.message);
        }
    };

    return (
        <PageTransition>
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
                {/* Decorative background shapes */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-indigo-400 dark:bg-indigo-600 rounded-full blur-[100px] opacity-20 hidden sm:block"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-purple-400 dark:bg-purple-600 rounded-full blur-[100px] opacity-20 hidden sm:block"></div>

                <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
                    <div className="flex justify-center">
                        <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-indigo-500/10 flex items-center justify-center transform -rotate-6">
                            <Package className="w-10 h-10 text-indigo-600 dark:text-indigo-400 transform rotate-6" />
                        </div>
                    </div>
                    <h2 className="mt-8 text-center text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Sign in to NexusMart
                    </h2>
                    <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
                        Or{' '}
                        <Link to="/register" className="font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors cursor-pointer">
                            create a new account
                        </Link>
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl py-10 px-6 shadow-2xl shadow-slate-200/50 dark:shadow-none sm:rounded-[2rem] sm:px-12 border border-white dark:border-slate-700 transition-colors duration-300">
                        <form className="space-y-6" onSubmit={handleLogin}>
                            {error && (
                                <div className="bg-rose-50 dark:bg-rose-500/10 rounded-xl p-4 border border-rose-100 dark:border-rose-500/20">
                                    <div className="flex">
                                        <div className="ml-3 text-sm text-rose-700 dark:text-rose-400 font-medium">{error}</div>
                                    </div>
                                </div>
                            )}

                            <Input
                                label="Email address"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                            />

                            <Input
                                label="Password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />

                            <Button type="submit" className="w-full h-12 text-base mt-2" disabled={isLoading}>
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <LogIn className="w-5 h-5 mr-2" />
                                        Sign in
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Login;
