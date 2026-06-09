"use client"
import Link from "next/link"
import Container from "../../Container"
import { IoCartOutline } from "react-icons/io5";
import { useShoppingCartContext } from "../context/ShoppingCartContext";
import cookie from "js-cookie"
import DropDownProfile from "./DropDownMenu";
import Search from "../Search";



const TopHeader = () => {

    const { cartTotalQty } = useShoppingCartContext();
    const token = cookie.get("token");

    return (
        <Container>
            <div className="flex justify-between items-center my-5" >
                <div className="flex items-center ">
                    <Link href={"/"}>
                        <img className="pl-7 cursor-pointer w-36 h-10 hidden sm:inline-block" src="/Logos/static_logo_techno_new.svg" title="Technolife" />
                    </Link>
                    <Search />
                </div>

                <div className="flex items-center ">
                    {
                        token ?
                            <Link href={"/login"} target="_blank" className={`${`cooke ? "w-[50px] pl-5 " : ""  `} mt-2 text-center`}>
                                <DropDownProfile />
                            </Link>
                            :
                            <Link target="_blank" className={`shadow rounded-sm p-1.5 ml-5 text-center ${`cook  ? "" : " w-[120px]"`}`} href={"/login"}>
                                ثبت نام | ورود
                            </Link>
                    }
                    <Link href={"/cart"}>
                        <IoCartOutline className="border border-neutral-400 w-7.5 h-7.5  rounded " title="سبد خرید"></IoCartOutline>
                        <div className="fixed">
                            <span className={`text-white bg-blue-800  -bottom-3.25 -right-2 rounded-md absolute w-5 text-center
                                 ${!cartTotalQty ? "opacity-0" : "opacity-100"}`}>
                                {cartTotalQty}
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
        </Container >
    );
};

export default TopHeader;