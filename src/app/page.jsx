import Image from "next/image";
import Link from "next/link";






export default function Dashboard() {
    const Menu = <>
        <Link  href='/contact'>

            <div className="card rfd">
                <Image width={80} height={50} alt="logo" src="https://i.ibb.co/wppL3d7/icons8-contact-100.png" />
                <h1 >Contact</h1>
            </div>

        </Link>
        <Link  href='/stock'>
            <div className="card rfd">
                <Image width={80} height={50} alt="logo" src="https://i.ibb.co/hXWvxBG/icons8-stock-100.png" />
                <h1 >Stock</h1>
            </div></Link>
        <Link  href='/sales'>
            <div className="card  rfd">
                <Image width={80} height={50} alt="logo" src="https://i.ibb.co/yp8vmJq/icons8-sales-100.png" />
                <h1 >Sales</h1>
            </div></Link>
        <Link  href='/report'>
            <div className="card rfd">
                <Image width={80} height={50} alt="logo" src="https://i.ibb.co/gFRRHby/icons8-report-100.png" />
                <h1 >Report</h1>
            </div></Link>
        <Link href='/settings'>
            <div className="card rfd ">
                <Image width={80} height={50} alt="logo" src="https://i.ibb.co/TRsNc3h/icons8-settings-100.png" />
                <h1 >Settings</h1>
            </div></Link>
        <Link href='/pos'>
            <div className="card rfd ">
                <Image width={80} height={50} alt="logo" src="https://i.ibb.co/qFZsq84/icons8-cash-register-100.png" />
                <h1 >POS</h1>
            </div></Link>

    </>
    return (
        <div className=" py-10 ">
            <ul className="card-container">
                {Menu}
            </ul>
        </div>

    );
}
