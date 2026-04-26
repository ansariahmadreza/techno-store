import Formhandler from "@/app/(main)/components/Formhandler";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "ورود / ثبت نام | فروشگاه اینترنتی تکنولایف",
};

const Login = () => {
    return (
        <section className="flex flex-col md:flex-row items-start md:items-stretch w-full min-h-screen">

            <div className="w-full md:w-1/2">
                <img src="/Logos/logo-Login.webp" alt="logo-Login" className="w-full md:w-275 h-75 sm:h-100 md:h-185.5 object-cover object-center" />
            </div>

            <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-5">
                <img src="/Logos/static_logo_techno_new.svg" alt="static_logo" className="w-37.5 mx-auto pt-12.5" />
                <h2 className="pt-10 text-[18px] text-center font-bold">
                    ورود | ثبت نام
                </h2>

                <h3 className="text-center pt-10 font-bold text-[15px]">خوش اومدی :)</h3>

                <div className="w-full mt-6 flex justify-center"><Formhandler /></div>
            </div>
        </section>
    );
};

export default Login;
