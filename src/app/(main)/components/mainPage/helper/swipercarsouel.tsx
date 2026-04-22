'use client';

import { useEffect, useState } from "react";
import SwiperCarousel from "../SwiperCarousel";

export interface RootCarousel {
    title: string;
    id: string;
    image: string;
    description: string;
    Price: number;
    DiscountedPrice: number;
    Discountpercentage: number;
    Score: number;
    slug:string
}

const SwiperCar = () => {
    const [Carousel, setCarousel] = useState<RootCarousel[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/Carousel', { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
                setCarousel(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching carousel:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center py-10">Loading carousel...</div>;
    }

    if (!Carousel || Carousel.length === 0) {
        return <div className="text-center py-10">No carousel data</div>;
    }

    return <SwiperCarousel Carousel={Carousel} />;
};

export default SwiperCar;