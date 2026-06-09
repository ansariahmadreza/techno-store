"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import cookie from "js-cookie";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "@/zustand";
import { userSchema, type RegisterFormData2 } from "@/utils/validExit";
import { useState } from "react";

const Page = () => {
    const router = useRouter();
    const { setUser2 } = useUserStore();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData2>({
        resolver: zodResolver(userSchema)
    });

    const onSubmit = async (data: RegisterFormData2) => {
        setIsLoading(true);
        setErrorMessage("");
        
        try {
            const response = await axios.get(`/api/users/check-email?email=${data.email}`);
            console.log("Response:", response.data);

            if (response.data.exists) {
                const { user } = response.data;
                const token = `mock-token-${user.slug}-${Date.now()}`;
                cookie.set('token', token, { expires: 365 });
                
                // ذخیره اطلاعات کاربر در Zustand
                setUser2({ email: user.email });
                
                // ذخیره slug در localStorage برای استفاده بعدی
                localStorage.setItem('userSlug', user.slug);
                
                router.push('/');
            } else {
                setErrorMessage("کاربر با این ایمیل پیدا نشد. لطفاً ثبت نام کنید.");
            }
        } catch (err) {
            console.error("Error:", err);
            setErrorMessage("خطا در اتصال به سرور. لطفاً دوباره تلاش کنید.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-linear-to-r from-blue-500 to-purple-600">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        خوش آمدید
                    </h1>
                    <p className="text-gray-500 mt-2">
                        لطفاً ایمیل خود را وارد کنید
                    </p>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            آدرس ایمیل
                        </label>
                        <input 
                            type="email" 
                            {...register("email")} 
                            className="w-full outline-none border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="ahmadreza.an.dev@gmail.com" 
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 text-white rounded-xl font-medium transition-all duration-200 ${
                            isLoading 
                                ? "bg-gray-400 cursor-not-allowed" 
                                : "bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl"
                        }`}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                در حال بررسی...
                            </span>
                        ) : "ورود به حساب کاربری"}
                    </button>
                    
                    {errorMessage && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                            <p className="text-red-600 text-sm text-center flex items-center justify-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {errorMessage}
                            </p>
                        </div>
                    )}
                </form>
                
                <div className="mt-6 text-center">
                    <p className="text-gray-500 text-sm">
                        حساب کاربری ندارید؟ 
                        <a href="/" className="text-blue-600 hover:text-blue-700 font-medium mr-1">
                            ثبت نام کنید
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Page;