import { Link } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';
import { Button } from '../components/ui/Button';
import { PackageX, Home } from 'lucide-react';

const NotFound = () => {
    return (
        <PageTransition>
            <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
                <div className="relative">
                    <div className="absolute inset-0 bg-indigo-500 blur-[100px] opacity-20 rounded-full animate-pulse"></div>
                    <div className="relative bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-xl shadow-indigo-500/10 border border-slate-100 dark:border-slate-800">
                        <PackageX className="w-32 h-32 text-indigo-500 mx-auto mb-6 transform hover:rotate-12 transition-transform duration-500" />
                        <h1 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">404</h1>
                        <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-4">Page Not Found</h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8 text-lg">
                            Oops! The page you are looking for doesn't exist or has been moved.
                        </p>
                        <Link to="/dashboard">
                            <Button className="h-14 px-8 rounded-2xl text-lg shadow-indigo-500/25">
                                <Home className="w-5 h-5 mr-2" />
                                Return to Dashboard
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default NotFound;
