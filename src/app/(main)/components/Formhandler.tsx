"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import cookie from "js-cookie"
import axios from "axios";
import { type RegisterFormData, userSchema } from "@/utils/valid";
import Link from "next/link";
import { useUserStore } from "../../../zustand";
import { useRouter } from "next/navigation";

const Formhandler = () => {
    const [serverMessage, setServerMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { setUser } = useUserStore()
    const router = useRouter()

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
        resolver: zodResolver(userSchema)
    })

    const onSubmit = async (data: RegisterFormData) => {
        setIsLoading(true)
        setServerMessage("")
        
        try {
            // ثبت نام کاربر جدید
            const registerResponse = await axios.post('/api/users/register', {
                namefamily: data.name,
                email: data.email,
                password: data.password,
                confrimPassword: data.confirmPassword
            });
            
            // بررسی موفقیت آمیز بودن ثبت نام
            if (registerResponse.data.success) {
                const { token, user } = registerResponse.data;
                
                // ذخیره توکن در کوکی
                cookie.set('token', token, { expires: 365 });
                
                // ذخیره اطلاعات کاربر در store
                setUser(user);
                
                setServerMessage(registerResponse.data.message || "ثبت نام با موفقیت انجام شد");
                
                // رفتن به صفحه اصلی بعد از 1 ثانیه
                setTimeout(() => {
                    router.push("/");
                }, 1000);
            } else {
                setServerMessage(registerResponse.data.message || "خطا در ثبت نام");
            }
            
        } catch (err: any) {
            console.error("Registration error:", err);
            
            // مدیریت خطاهای مختلف
            if (err.response?.status === 409) {
                setServerMessage(err.response?.data?.message || "این ایمیل قبلاً ثبت نام کرده است");
            } else if (err.response?.status === 400) {
                const errorData = err.response?.data;
                if (errorData?.errors && errorData.errors.length > 0) {
                    setServerMessage(errorData.errors[0]);
                } else {
                    setServerMessage(errorData?.message || "خطا در اعتبارسنجی اطلاعات");
                }
            } else if (err.response?.status === 500) {
                setServerMessage("خطای سرور. لطفاً دوباره تلاش کنید.");
            } else {
                setServerMessage("مشکلی پیش آمد. لطفاً دوباره تلاش کنید.");
            }
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div>
            <form className="flex flex-col items-center justify-center gap-3 pt-7" onSubmit={handleSubmit(onSubmit)} >
                <input type="text" {...register('name')} className="outline-0 border rounded p-1 w-[300px]" placeholder="نام و نام خانوادگی" />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                
                <input type="email" {...register("email")} className="outline-0 border rounded p-1 w-[300px]" placeholder="ایمیل" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                
                <input type="password" placeholder="رمز عبور" className="outline-0 border rounded p-1 w-[300px]" {...register("password")} />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                
                <input type="password" {...register("confirmPassword")} className="outline-0 border rounded p-1 w-[300px]" placeholder="تکرار رمز عبور" />
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                
                <Link href={"/login/ExistingUser"} className="text-[14px] text-blue-600 hover:underline">
                    در صورتی که ثبت نام کرده اید از اینجا وارد شوید
                </Link>
                
                <button type="submit"
                    disabled={isSubmitting || isLoading}
                    className={`p-2 text-white rounded-lg cursor-pointer mt-9 w-[300px] transition-colors ${(isSubmitting || isLoading) ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                >
                    {(isSubmitting || isLoading) ? "...در حال ارسال" : "ثبت نام"}
                </button>
                
                {serverMessage && (
                    <p className={`text-center mt-2 ${(serverMessage.includes("موفقیت") || serverMessage.includes("انجام شد")) ? "text-green-600" : "text-red-600"}`}>
                        {serverMessage}
                    </p>
                )}
            </form>
        </div>
    )
}

export default Formhandler;