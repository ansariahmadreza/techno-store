"use client";
import { formatNumberWithCommas } from "@/utils/number";
import AddToCart from "../components/(products)/AddToCart";
import { RootCarousel } from "../components/mainPage/helper/swipercarsouel";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";



const Store = () => {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<RootCarousel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/Carousel/${id}`, {
          cache: "no-cache"
        });

        if (!res.ok) {
          throw new Error("محصول پیدا نشد");
        }

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "خطا در دریافت اطلاعات");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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

  const Purchaseprofit = product.Price - product.DiscountedPrice;

  return (
    <div>
      <title>{product.description}</title>
      <section className="w-[90%] max-w-275 pb-30 mx-auto mt-25 rounded-md shadow-2xl border-2 border-neutral-200 p-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="flex justify-center w-full sm:w-1/3">
          <img
            src={product.image}
            alt={product.description}
            title={product.description}
            className="rounded-md w-[50%] sm:w-full object-cover"
          />
        </div>

        <div className="w-full sm:w-2/3 text-center sm:text-right">
          <h2 className="inline-block">{formatNumberWithCommas(product.DiscountedPrice)}</h2>
          <span className="pr-1">تومان</span>
          <div>
            <span className="text-neutral-500 line-through ml-2">
              {formatNumberWithCommas(product.Price)}
            </span>
            <span className="text-neutral-500">تومان</span>
            <div>
              <h2 className="inline-block text-neutral-500">
                {formatNumberWithCommas(Purchaseprofit)}
              </h2>
              <span className="text-neutral-500 pr-3">سود شما از خرید</span>
            </div>
          </div>
          <p>{product.description}</p>
        </div>
        <div className="mt-6 flex justify-center sm:justify-start">
          <AddToCart id={id} />
        </div>
      </section>
    </div>
  );
};

export default Store;