import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import PageTransition from '../components/layout/PageTransition';
import { User, Mail, Save, KeyRound } from 'lucide-react';

const Profile = () => {
    const { user, updateProfile } = useAuth();
    const { addToast } = useToast();

    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState({ type: '', text: '' });
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        setIsSaving(true);

        await new Promise(r => setTimeout(r, 600));

        const updates = { name, email };
        if (password.trim() !== '') {
            if (password.length < 6) {
                setMessage({ type: 'error', text: 'Password must be at least 6 characters.' });
                setIsSaving(false);
                return;
            }
            updates.password = password;
        }

        const result = updateProfile(updates);
        setIsSaving(false);

        if (result.success) {
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            addToast('Profile updated successfully!', 'success');
            setPassword(''); // clear password field
        } else {
            setMessage({ type: 'error', text: 'Failed to update profile.' });
            addToast('Failed to update profile.', 'error');
        }
    };

    return (
        <PageTransition>
            <div className="max-w-4xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8 py-8 relative transition-colors duration-300">
                {/* Decorative background shapes */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-indigo-400 dark:bg-indigo-600 rounded-full blur-[100px] opacity-10 hidden sm:block pointer-events-none"></div>

                <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden text-center sm:text-left transition-colors duration-300">
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-indigo-500 to-purple-600 sm:hidden"></div>
                    <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl sm:text-5xl font-extrabold shadow-xl shadow-indigo-500/30 flex-shrink-0 relative z-10 border-4 border-white dark:border-slate-800 mt-8 sm:mt-0">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="relative z-10">
                        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Your Profile</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Manage your account settings and preferences</p>
                    </div>
                </div>

                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
                    <div className="p-8 sm:p-12">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {message.text && (
                                <div className={`p-4 rounded-xl border ${message.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20' : 'bg-rose-50 dark:bg-rose-500/10 text-rose-800 dark:text-rose-400 border-rose-200 dark:border-rose-500/20'
                                    }`}>
                                    <span className="font-semibold">{message.text}</span>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <Input
                                        label={
                                            <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold mb-1">
                                                <User className="w-5 h-5 text-indigo-500 dark:text-indigo-400" /> Full Name
                                            </span>
                                        }
                                        type="text"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        required
                                        className="h-14 text-lg"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Input
                                        label={
                                            <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold mb-1">
                                                <Mail className="w-5 h-5 text-indigo-500 dark:text-indigo-400" /> Email Address
                                            </span>
                                        }
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                        className="h-14 text-lg"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 max-w-md pt-4">
                                <Input
                                    label={
                                        <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold mb-1">
                                            <KeyRound className="w-5 h-5 text-indigo-500 dark:text-indigo-400" /> New Password
                                        </span>
                                    }
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Leave blank to keep current"
                                    className="h-14 text-lg"
                                />
                                <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 ml-1">Must be at least 6 characters long.</p>
                            </div>

                            <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                                <Button
                                    type="submit"
                                    disabled={isSaving}
                                    className="h-14 px-10 rounded-2xl text-lg shadow-indigo-500/25 w-full sm:w-auto"
                                >
                                    {isSaving ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5 mr-2" />
                                            Save Changes
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Profile;
