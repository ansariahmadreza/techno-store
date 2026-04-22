"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CiUser } from "react-icons/ci";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserStore } from "../../../zustand";

export interface infoUsers {
    slug: string;
    namefamily: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const DropdownProfile = () => {
    const [hover, setHover] = useState(false);
    const [lastUser, setLastUser] = useState<infoUsers[]>([]);
    const [loading, setLoading] = useState(true);
    const { user, user2, logout } = useUserStore();
    const router = useRouter();

    // دریافت لیست کاربران از MSW
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/users');
                console.log("✅ Fetched users:", response.data);
                setLastUser(response.data);
            } catch (err) {
                console.error("❌ Error fetching users:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();

        // غیرفعال کردن رفتار پیش فرض اسکرول
        const observe = new MutationObserver(() => {
            const body = document.querySelector('body');
            if (body?.getAttribute('data-scroll-locked') === "1") {
                body.removeAttribute("data-scroll-locked");
            }
        });
        observe.observe(document.body, { attributes: true, attributeFilter: ["data-scroll-locked"] });
        return () => observe.disconnect();
    }, []);

    // خروج از حساب کاربری
    const handlerExit = () => {
        Cookies.remove("token");
        logout(); // پاک کردن اطلاعات از Zustand
        location.replace('/')
    };

    // ایمیل کاربر جاری از Zustand
    const currentUser = user2?.email || user?.email;

    // پیدا کردن اطلاعات کامل کاربر از MSW
    const allData = lastUser.find(u => u.email === currentUser);

    // هدایت به صفحه پروفایل
    const handlerRedirect = () => {
        if (allData?.slug) {
            router.push(`/login/${allData.slug}`);
        } else if (currentUser) {
            // اگر کاربر لاگین است اما slug ندارد، فقط به صفحه اصلی برو
            router.push("/");
        } else {
            router.push("/login");
        }
    };

    // نمایش لودینگ
    if (loading) {
        return <CiUser className="shadow-lg h-7 w-7 rounded" />;
    }


    return (
        <div onMouseLeave={() => setHover(false)} onMouseOver={() => setHover(true)}>
            <DropdownMenu dir="rtl" open={hover} onOpenChange={setHover}>
                <DropdownMenuTrigger onClick={handlerRedirect}>
                    <CiUser className="shadow-lg h-7 w-7 rounded" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="ml-20 w-[250px]" sideOffset={1}>
                    <section className="w-60 h-[110px]">
                        {allData && (
                            <Link href={`/login/${allData.slug}`}>
                                <DropdownMenuItem>
                                    حساب کاربری
                                    <span className="text-[14px] text-neutral-500 mr-2">{allData.namefamily}</span>
                                </DropdownMenuItem>
                            </Link>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>تنظیمات</DropdownMenuItem>
                        <DropdownMenuItem onSelect={handlerExit} className="text-red-600">
                            خروج از حساب کاربری
                        </DropdownMenuItem>
                    </section>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default DropdownProfile;