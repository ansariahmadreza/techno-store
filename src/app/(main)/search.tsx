"use client"
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { PiMagnifyingGlassLight } from "react-icons/pi";
import { products, type Product } from "../../../mocks/data";

// تابع ساخت slug فارسی (هماهنگ با data.ts)
const createPersianSlug = (text: string) => {
    return text
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-آ-ی]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .toLowerCase();
};

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // جستجو با تأخیر (debounce)
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm.trim()) {
                const filtered = products.filter(item =>
                    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setSearchResults(filtered);
            } else {
                setSearchResults([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    // بستن نتایج جستجو با کلیک خارج از باکس
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setSearchResults([]);
                setIsInputFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // جلوگیری از اسکرول در حالت موبایل
    useEffect(() => {
        if (isMobileSearchOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileSearchOpen]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleProductClick = (product: Product) => {
        // استفاده از slug ذخیره شده در محصول یا ساخت slug جدید
        const slug = product.slug || createPersianSlug(product.title);
        setSearchResults([]);
        setSearchTerm('');
        setIsMobileSearchOpen(false);
        router.push(`/store/${slug}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchResults.length > 0) {
            handleProductClick(searchResults[0]);
        }
    };

    const clearSearch = () => {
        setSearchTerm('');
        setSearchResults([]);
    };

    return (
        <section className="relative" ref={searchRef}>
            {/* دسکتاپ */}
            <div className="hidden lg:flex justify-center items-center relative">
                <PiMagnifyingGlassLight className="absolute right-3 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={() => setIsInputFocused(true)}
                    onKeyDown={handleKeyDown}
                    className="w-80 h-10 pr-10 pl-4 rounded-full bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                    type="text"
                    placeholder="جستجوی محصول..."
                />
                {searchTerm && (
                    <button
                        onClick={clearSearch}
                        className="absolute left-3 w-5 h-5 text-gray-400 hover:text-gray-600"
                    >
                        <IoClose />
                    </button>
                )}
            </div>

            {/* موبایل */}
            <div className="lg:hidden">
                <PiMagnifyingGlassLight
                    onClick={() => setIsMobileSearchOpen(true)}
                    className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600 transition"
                />
            </div>

            {/* مودال جستجوی موبایل */}
            {isMobileSearchOpen && (
                <div className="fixed inset-0 z-50 bg-white">
                    <div className="sticky top-0 bg-white border-b p-4 flex items-center gap-3">
                        <div className="flex-1 relative">
                            <PiMagnifyingGlassLight className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyDown}
                                autoFocus
                                className="w-full h-12 pr-10 pl-4 rounded-full bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400"
                                type="text"
                                placeholder="جستجوی محصول..."
                            />
                            {searchTerm && (
                                <button onClick={clearSearch} className="absolute left-3 top-1/2 -translate-y-1/2">
                                    <IoClose className="w-5 h-5 text-gray-400" />
                                </button>
                            )}
                        </div>
                        <button onClick={() => setIsMobileSearchOpen(false)} className="px-4 py-2 text-blue-600 font-medium">
                            بستن
                        </button>
                    </div>

                    {/* نتایج جستجو در موبایل */}
                    <div className="p-4">
                        {searchResults.length > 0 ? (
                            searchResults.map((product) => (
                                <button
                                    key={product.id}
                                    onClick={() => handleProductClick(product)}
                                    className="w-full text-right px-4 py-3 hover:bg-gray-50 transition-colors border-b last:border-b-0"
                                >
                                    <p className="text-sm text-gray-800 font-medium">{product.title}</p>
                                    <p className="text-xs text-gray-500 line-clamp-1">{product.description}</p>
                                    <p className="text-sm text-blue-600 mt-1">{product.Price.toLocaleString()} تومان</p>
                                </button>
                            ))
                        ) : searchTerm ? (
                            <div className="text-center py-10 text-gray-500">
                                محصولی با نام "{searchTerm}" یافت نشد
                            </div>
                        ) : null}
                    </div>
                </div>
            )}

            {/* نتایج جستجو دسکتاپ */}
            {(searchResults.length > 0 || (isInputFocused && searchTerm)) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
                    {searchResults.length > 0 ? (
                        searchResults.map((product) => (
                            <button
                                key={product.id}
                                onClick={() => handleProductClick(product)}
                                className="w-full text-right px-4 py-3 hover:bg-gray-50 transition-colors border-b last:border-b-0"
                            >
                                <p className="text-sm text-gray-800 font-medium">{product.title}</p>
                                <p className="text-xs text-gray-500 line-clamp-1">{product.description}</p>
                                <p className="text-sm text-blue-600 mt-1">{product.Price.toLocaleString()} تومان</p>
                            </button>
                        ))
                    ) : (
                        <div className="px-4 py-8 text-center text-gray-500 text-sm">
                            محصولی یافت نشد
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default Search;