import Link from 'next/link';
import "../globals.css";

const Contact = () => {

    const contact = ['customer', 'supplier', 'import-export']
    const subMenu = <>
        <Link href='/contact/customer'>

            <div className="card2">

                <h1 >Customer</h1>
            </div>

        </Link>
        <Link href='/contact/supplier'>
            <div className="card2">

                <h1 >Supplier</h1>
            </div></Link>
        <Link href='/contact/import-export'>
            <div className="card2">
                <h1 >Import/Export</h1>
            </div></Link>
        

    </>
    return (
        <div className=" py-10 mx-auto">
            <ul className="card-container1">
                {subMenu}
                {/* {
                    contact.map((item,index) => (
                        <Link key={index} href={`/contact/${item}`}>
                            <div className="card2">
                                <h1 >{item}</h1>
                            </div></Link>
                    ))
                } */}
            </ul>
        </div>

    );
};

export default Contact;