'use client';
import { useEffect, useState } from "react";
import { RootCarousel } from "../components/mainPage/helper/swipercarsouel";
import Container from "../../Container";
import ProductListWithPagination from "../components/ProductListWithPagination";

const Products = () => {
    const [showData, setShowData] = useState<RootCarousel[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/Products')
            .then(res => res.json())
            .then(data => {
                setShowData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching products:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div>
                <Container>
                    <div className="mt-10 min-h-[60px]">
                        <div className="text-center py-10">Loading products...</div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div>
            <Container>
                <div className="mt-10 min-h-[60px]">
                    <ProductListWithPagination showData={showData} />
                </div>
            </Container>
        </div>
    );
};
export default Products;