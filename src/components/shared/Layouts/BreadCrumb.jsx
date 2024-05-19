"use client"
import { usePathname } from "next/navigation";

const BreadCrumb = () => {

    const pathname = usePathname()
    console.log(pathname)
    const list = pathname.split('/').slice(1)
    console.log(list)
    return (
        <div className="md:text-sm text-xs mx-4  breadcrumbs">

            <ul>
                <li><a className="px-1 ">Dashboard</a></li>

                {
                    list.map((item, index) => (
                        <li key={index + 1}> <a  className="px-1 " >{item.split('-').map(word => {return word.charAt(0).toUpperCase()+word.slice(1) + " "})}</a></li>
                    ))
                }

            </ul>

        </div>
    );
};

export default BreadCrumb;