"use client"
import "../../../app/globals.css";
import { DashboardOutlined, LoginOutlined} from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import BreadCrumbs from "./BreadCrumb";
import { userStore } from "@/store/user";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const router = useRouter()
    const user = userStore(state => state.user)
    const removeUser = userStore(state => state.removeUser)
    console.log(user?.is_authenticated)
    const User = user?.is_authenticated
    const handleLogout=()=>{
        removeUser()
        router.push('/login')

    }
    const menuItems = <>

        <Link className=" mr-4" href='/'><li className="rfd"><DashboardOutlined className="lg:hidden" /><span className="hidden lg:flex">Dashboard</span></li></Link>
        {
            User ? <>
                

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <Image width={80} height={80} alt="Tailwind CSS Navbar component" src={user?.profile?.photo}/>
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-1 shadow bg-base-200 rounded-box w-28">
                        
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            </> : <>
                <Link className=" mr-4" href='/login'><li className="rfd"><LoginOutlined className="lg:hidden" /><span className="hidden lg:flex">Login</span></li></Link>
            </>
        }







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
