"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";

const BreadCrumb = () => {

    const pathname = usePathname()
    console.log(pathname)
    const list = pathname.split('/').slice(1)
    console.log(list)
    return (
        <div className="md:text-sm text-xs mx-4  breadcrumbs">

            <ul>
                <li><Link className="px-1" href="/">Dashboard</Link></li>

                {
                    list.map((item, index) => {
                        if (index+1 == list.length)
                            return <li key={index + 1}> <Link href="#" className="px-1 " >{item.split('-').map(word => {return word.charAt(0).toUpperCase()+word.slice(1) + " "})}</Link></li>
                        else
                        return <li key={index + 1}> <Link href={`/${item}`} className="px-1 " >{item.split('-').map(word => {return word.charAt(0).toUpperCase()+word.slice(1) + " "})}</Link></li>
})
                }

            </ul>

        </div>
    );
};

export default BreadCrumb;