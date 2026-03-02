// LocalStorage abstraction
const prefix = 'ecommerce_';

export const storage = {
    get: (key, defaultValue = null) => {
        try {
            const item = window.localStorage.getItem(prefix + key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Error reading from localStorage', error);
            return defaultValue;
        }
    },
    set: (key, value) => {
        try {
            window.localStorage.setItem(prefix + key, JSON.stringify(value));
        } catch (error) {
            console.error('Error writing to localStorage', error);
        }
    },
    remove: (key) => {
        window.localStorage.removeItem(prefix + key);
    }
};
