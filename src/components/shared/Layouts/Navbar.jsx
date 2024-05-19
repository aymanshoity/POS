"use client"
import "../../../app/globals.css";
import { DashboardOutlined, LoginOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import BreadCrumbs from "./BreadCrumb";

const Navbar = () => {


    const menuItems = <>

        <Link className=" mr-4" href='/'><li className="rfd"><DashboardOutlined className="lg:hidden" /><span className="hidden lg:flex">Dashboard</span></li></Link>
        <Link className=" mr-4" href='/login'><li className="rfd"><LoginOutlined className="lg:hidden" /><span className="hidden lg:flex">Login</span></li></Link>
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <Image width={80} height={80} alt="Tailwind CSS Navbar component" src="https://i.ibb.co/x7x8qQr/t5.jpg" />
                </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                    <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                    </a>
                </li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
            </ul>
        </div>


    </>
    return (

        <>
            {/* large screen */}
            <div className="hidden lg:block">
                <div className="flex flex-row justify-between bg-base-200  px-4 ">
                    <div className="flex md:flex-row md:items-center  flex-col">

                        <div className=" mr-4"><Image className="" src="https://i.ibb.co/bBKQzcD/anzaraltd.png" width={80}
                            height={40} alt="logo" /></div>
                            <BreadCrumbs></BreadCrumbs>

                    </div>
                    <div className=" navbar-end  flex">
                        <ul className="rfd text-xs">
                            {menuItems}
                        </ul>
                    </div>

                </div>
            </div>
            {/* mobile screen */}
            <div className="lg:hidden ">
                <div className="flex flex-row justify-between bg-base-200  px-4 ">
                    <div className="flex md:flex-row md:items-center  flex-col">

                        <div className=" mr-4"><Image className="" src="https://i.ibb.co/bBKQzcD/anzaraltd.png" width={80}
                            height={40} alt="logo" /></div>

                    </div>
                    <div className=" navbar-end  flex">
                        <ul className="rfd text-xs">
                            {menuItems}
                        </ul>
                    </div>

                </div>
                <BreadCrumbs></BreadCrumbs>
            </div>
            

        </>





    );
};

export default Navbar;
