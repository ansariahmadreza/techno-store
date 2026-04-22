"use client";
import { formatNumberWithCommas } from "@/utils/number";
import AddToCart from "../../components/(products)/AddToCart";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { products, type Product } from "../../../../../mocks/data";

const Store = () => {
    const params = useParams();
    const encodedSlug = params.slug as string;
    
    // دیکود کردن slug از URL
    const slug = encodedSlug ? decodeURIComponent(encodedSlug) : "";

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("🔍 encodedSlug from URL:", encodedSlug);
        console.log("🔍 decoded slug:", slug);
        
        if (!slug) {
            setLoading(false);
            setError("آدرس محصول نامعتبر است");
            return;
        }

        // پیدا کردن محصول بر اساس slug
        const foundProduct = products.find(product => product.slug === slug);
        
        console.log("✅ foundProduct:", foundProduct ? foundProduct.title : "NOT FOUND");
        
        if (foundProduct) {
            setProduct(foundProduct);
            setError(null);
        } else {
            setError("محصول یافت نشد");
        }
        setLoading(false);
    }, [slug, encodedSlug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl">در حال بارگذاری...</div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl text-red-500">{error || "محصول یافت نشد"}</div>
            </div>
        );
    }

    return (
        <section>
            <title>{product.description}</title>
            <section
                className="w-[90%] max-w-[1100px] pb-[120px] sm:flex-row items-center gap-6
             mx-auto mt-[100px] rounded-md shadow-2xl border-2 border-neutral-200 p-6 flex flex-col"
            >
                <div className="flex justify-center w-full sm:w-1/3">
                    <img
                        src={product.image}
                        alt={product.description}
                        title={product.description}
                        className="rounded-md w-[50%] sm:w-full object-cover"
                    />
                </div>

                <div className="w-full sm:w-2/3 text-center sm:text-right">
                    <h2 className="inline-block">{formatNumberWithCommas(product.Price)}</h2>
                    <span className="pr-2">تومان</span>
                    <p className="mt-2">{product.description}</p>
                </div>
                <AddToCart id={product.id} />
            </section>
        </section>
    );
};

export default Store;