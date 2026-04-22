'use client';

import { useEffect, useState } from "react";
import Swiperslide from "../SwiperSlide";

export interface Rootimg {
    id: string;
    alt: string;
    image: string;
}

const Slider = () => {
    const [imgSlider, setImgSlider] = useState<Rootimg[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSliderData = async () => {
            try {
                setLoading(true);
                const response = await fetch('/ProductSlider', {
                    cache: "no-store"
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                setImgSlider(data);
                setError(null);
            } catch (err) {
                console.error("Error fetching slider:", err);
                setError(err instanceof Error ? err.message : "Unknown error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchSliderData();
    }, []); // آرایه خالی یعنی فقط یک بار در زمان mount اجرا شود

    // نمایش لودینگ
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-gray-500 text-lg">Loading slider...</div>
            </div>
        );
    }

    // نمایش خطا
    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-red-500 text-lg">Error: {error}</div>
            </div>
        );
    }

    // نمایش اسلایدر با داده‌ها
    return <Swiperslide imgSlider={imgSlider} />;
};

export default Slider;