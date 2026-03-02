import { createContext, useContext, useState, useCallback, useRef } from 'react';
import anime from 'animejs';

export const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const toastElements = useRef({});

    const removeToast = useCallback((id) => {
        const el = toastElements.current[id];
        if (el && typeof anime === 'function') {
            anime({
                targets: el,
                opacity: 0,
                translateX: 100,
                duration: 300,
                easing: 'easeInQuad',
                complete: () => {
                    setToasts(prev => prev.filter(t => t.id !== id));
                    delete toastElements.current[id];
                }
            });
        } else {
            setToasts(prev => prev.filter(t => t.id !== id));
        }
    }, []);

    const addToast = useCallback((message, type = 'success') => {
        const id = new Date().getTime().toString();
        const newToast = { id, message, type };

        setToasts(prev => [...prev, newToast]);

        // Auto remove after 3s
        setTimeout(() => {
            removeToast(id);
        }, 3000);
    }, [removeToast]);

    const registerToastRef = (id, el) => {
        if (el && !toastElements.current[id]) {
            toastElements.current[id] = el;
            // Entrance animation
            if (typeof anime === 'function') {
                anime({
                    targets: el,
                    translateX: [100, 0],
                    opacity: [0, 1],
                    duration: 400,
                    easing: 'easeOutElastic(1, .8)'
                });
            }
        }
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        ref={(el) => registerToastRef(toast.id, el)}
                        className={`px-6 py-3 rounded-2xl shadow-lg border backdrop-blur-md flex items-center gap-3 \${
                            toast.type === 'success' 
                                ? 'bg-emerald-50/90 border-emerald-200 text-emerald-800' 
                                : 'bg-rose-50/90 border-rose-200 text-rose-800'
                        }`}
                        style={{ minWidth: '250px' }}
                    >
                        <div className="font-semibold">{toast.message}</div>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="ml-auto text-slate-400 hover:text-slate-600 focus:outline-none"
                        >
                            <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
