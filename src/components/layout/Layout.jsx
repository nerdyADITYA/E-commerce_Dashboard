import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col font-sans transition-colors duration-300">
            <Navbar />
            <main className="flex-1 w-full mx-auto relative overflow-hidden">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
