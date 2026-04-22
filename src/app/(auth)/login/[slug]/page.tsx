'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface UserInfo {
    slug: string;
    namefamily: string;
    email: string;
    createdAt?: string;
}

const Profileuser = () => {
    const params = useParams();
    const slug = params.slug as string;

    const [infoUser, setInfoUser] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        if (!slug) {
            setLoading(false);
            setError("آدرس کاربر نامعتبر است");
            return;
        }

        const fetchUser = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/users/by-slug/${slug}`);
                if (!res.ok) {
                    if (res.status === 404) {
                        throw new Error("کاربری با این شناسه یافت نشد");
                    }
                    throw new Error("خطا در دریافت اطلاعات");
                }

                const data = await res.json();
     
                setInfoUser(data);
            } catch (err) {
                console.error("❌ Error:", err);
                setError(err instanceof Error ? err.message : "خطا در اتصال");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl">در حال بارگذاری...</div>
            </div>
        );
    }

    if (error || !infoUser) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl text-red-500">{error || "کاربری یافت نشد"}</div>
            </div>
        );
    }

    return (
        <div className="mt-[200px] shadow-2xl text-center w-[400px] mx-auto min-h-[200px] border-neutral-400 rounded border p-6">
            <section className="mt-5">
                <h2 className="text-xl font-bold mb-4">
                    <span className="inline-block text-gray-600">حساب کاربری:</span>
                    <span className="mr-2 text-blue-700">{infoUser.namefamily}</span>
                </h2>
                <h4 className="text-lg">
                    <span className="inline-block text-gray-600">آدرس ایمیل:</span>
                    <span className="mr-2 text-gray-800">{infoUser.email}</span>
                </h4>
                {infoUser.createdAt && (
                    <p className="text-sm text-gray-500 mt-4">
                        تاریخ عضویت: {new Date(infoUser.createdAt).toLocaleDateString('fa-IR')}
                    </p>
                )}
            </section>
        </div>
    );
};

export default Profileuser;