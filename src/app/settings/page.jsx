import Link from 'next/link';
import React from 'react';

const settings = () => {
    const subMenu = <>
        <Link  href='/settings/group-of-company'>
        <div className='card2'>
                <h1 >Group Of Company</h1>
            </div></Link>
        <Link  href='/settings/company'>
        <div className='card2'>
                <h1 >Company</h1>
            </div></Link>
        <Link  href='/settings/office-type'>
        <div className='card2'>
                <h1 >Office Type</h1>
            </div></Link>
        <Link  href='/settings/office-location'>
        <div className='card2'>
                <h1 >Office Location</h1>
            </div></Link>
        <Link  href='/settings/office'>
        <div className='card2'>
                <h1 >Office</h1>
            </div></Link>
        <Link  href='/settings/contact-groups'>
        <div className='card2'>
                <h1 >Contact Group</h1>
            </div></Link>
        <Link  href='/settings/delivery-methods'>
        <div className='card2'>
                <h1 >Delivery Methods</h1>
            </div></Link>
        <Link  href='/settings/account-groups'>
        <div className='card2'>
                <h1 >Account Groups</h1>
            </div></Link>
        <Link  href='/settings/permissions'>
        <div className='card2'>
                <h1 >Permissions</h1>
            </div></Link>

    </>
    return (
        <div className=" py-10 mx-auto">
            <ul className="card-container1">
                {subMenu}

            </ul>
        </div>
    );
};

export default settings;