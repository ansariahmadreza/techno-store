"use client"
import { useState } from "react";
import { RootCarousel } from "./mainPage/helper/swipercarsouel";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { formatNumberWithCommas } from "@/utils/number";

// تابع ساخت slug فارسی
const createPersianSlug = (text: string) => {
    return text
        .trim()
        .replace(/\s+/g, '-')           // فاصله به -
        .replace(/[^\w\-آ-ی]/g, '')     // حذف کاراکترهای خاص (نگه داشتن فارسی)
        .replace(/-+/g, '-')            // تبدیل چند - به یک -
        .replace(/^-|-$/g, '')          // حذف - از اول و آخر
        .toLowerCase();                 // تبدیل به حروف کوچک
};

const ProductListWithPagination = ({ showData }: { showData: RootCarousel[] }) => {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 5; // تعداد محصول در هر صفحه

    // محاسبه صفحه‌بندی
    const totalPages = Math.ceil(showData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = showData.slice(startIndex, endIndex);

    // تولید شماره صفحات
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // اگر محصولی وجود ندارد
    if (showData.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                محصولی یافت نشد
            </div>
        );
    }

    return (
        <div>
            <section className="my-8 min-h-screen flex flex-col">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentProducts.map((item) => (
                        <Link
                            key={item.id}
                            href={`/store/${createPersianSlug(item.description)}`}
                            target="_blank"
                        >
                            <section className="flex flex-col justify-between bg-white shadow-lg rounded-2xl border hover:shadow-xl transition p-4 h-full">
                                <h2 className="text-gray-600 text-sm mb-2 line-clamp-1">{item.title}</h2>
                                <img 
                                    className="w-40 h-32 object-contain mx-auto mb-3" 
                                    src={item.image} 
                                    alt={item.description} 
                                    referrerPolicy="no-referrer" 
                                    loading="lazy" 
                                    title={item.description} 
                                />
                                <div className="flex justify-center items-center gap-1 text-gray-800 font-semibold">
                                    <span>{formatNumberWithCommas(item.Price)}</span>
                                    <span className="text-sm">تومان</span>
                                </div>
                                <p className="text-gray-500 text-sm text-center mt-2 line-clamp-2">
                                    {item.description}
                                </p>
                                <div className="flex justify-end items-center gap-1 mt-3 text-yellow-400">
                                    <FaStar />
                                    <p className="text-gray-700">{item.Score}</p>
                                </div>
                            </section>
                        </Link>
                    ))}
                </div>
            </section>

            {/* دکمه‌های صفحه‌بندی */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center my-8">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`cursor-pointer border rounded-md px-3 mx-2 py-1
                            ${currentPage === 1 ? 'opacity-50 cursor-not-allowed bg-gray-200' : 'hover:bg-gray-400 hover:text-white'}`}
                    >
                        قبلی
                    </button>
                    
                    {pageNumbers.map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
                            className={`cursor-pointer border rounded-md px-3 mx-2 py-1
                                ${currentPage === pageNumber ? 'bg-neutral-400 text-white' : 'hover:bg-gray-400 hover:text-white'}`}
                        >
                            {pageNumber}
                        </button>
                    ))}
                    
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`cursor-pointer border rounded-md px-3 mx-2 py-1
                            ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed bg-gray-200' : 'hover:bg-gray-400 hover:text-white'}`}
                    >
                        بعدی
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductListWithPagination;