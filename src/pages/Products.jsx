import { useState, useEffect, useRef, useMemo } from 'react';
import PageTransition from '../components/layout/PageTransition';
import { ProductCard } from '../components/ui/ProductCard';
import productsData from '../data/products.json';
import { PackageSearch, Search, Filter } from 'lucide-react';
import { Input } from '../components/ui/Input';

const ITEMS_PER_PAGE = 8;

const Products = () => {
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE);

    const observerTarget = useRef(null);

    // Get unique categories
    const categories = useMemo(() => {
        const cats = new Set(productsData.map(p => p.category));
        return ['All', ...Array.from(cats)];
    }, []);

    // Filter products
    const filteredProducts = useMemo(() => {
        return productsData.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory]);

    // Visible products based on infinite scroll
    const visibleProducts = useMemo(() => {
        return filteredProducts.slice(0, displayedCount);
    }, [filteredProducts, displayedCount]);

    // Initial load simulation
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, []);

    // Helper functions for updating filters and resetting scroll
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setDisplayedCount(ITEMS_PER_PAGE);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setDisplayedCount(ITEMS_PER_PAGE);
    };

    // Intersection Observer for Infinite Scroll
    useEffect(() => {
        if (loading) return;

        const observer = new IntersectionObserver(
            entries => {
                const first = entries[0];
                if (first.isIntersecting && displayedCount < filteredProducts.length) {
                    setDisplayedCount(prev => Math.min(prev + ITEMS_PER_PAGE, filteredProducts.length));
                }
            },
            { threshold: 0.1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [loading, displayedCount, filteredProducts.length]);

    if (loading) {
        return (
            <PageTransition>
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <div className="w-14 h-14 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                    <p className="mt-6 text-slate-500 dark:text-slate-400 font-medium animate-pulse">Curating our premium collection...</p>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300">
                {/* Header & Filters */}
                <div className="flex flex-col gap-6 bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden transition-colors duration-300">
                    <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-indigo-400 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                        <div>
                            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Our Collection</h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Showing {filteredProducts.length} items</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 flex-1 md:max-w-xl">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all"
                                />
                            </div>

                            <div className="relative shrink-0">
                                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <select
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                    className="w-full sm:w-48 pl-12 pr-8 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white appearance-none cursor-pointer capitalize transition-all"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 transition-colors duration-300">
                        <PackageSearch className="w-20 h-20 text-indigo-200 dark:text-indigo-900 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">No products found</h3>
                        <p className="text-slate-500 dark:text-slate-400 mt-3">Try adjusting your search or filters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {visibleProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}

                {/* Infinite Scroll Sentinel */}
                {displayedCount < filteredProducts.length && (
                    <div ref={observerTarget} className="py-12 flex justify-center">
                        <div className="w-8 h-8 border-4 border-indigo-100 dark:border-indigo-900/50 border-t-indigo-600 rounded-full animate-spin"></div>
                    </div>
                )}
            </div>
        </PageTransition>
    );
};

export default Products;
