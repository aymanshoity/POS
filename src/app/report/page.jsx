import Link from 'next/link';
import React from 'react';

const report = () => {
    
    const subMenu = <>
        <Link href='/report/sales-report'>
            <div className='card2'>
                <h1 >Sales Report</h1>
            </div>
        </Link>
        <Link href='/report/due-collection'>
            <div className='card2'>
                <h1 >Due Collection</h1>
            </div></Link>
        <Link href='/report/delivery-report'>
            <div className='card2'>
                <h1 >Delivery Report</h1>
            </div></Link>
        <Link href='/report/service-report'>
            <div className='card2'>
                <h1 >Service Report</h1>
            </div></Link>
        <Link href='/report/vat-report'>
            <div className='card2'>
                <h1 >VAT Report</h1>
            </div></Link>
        <Link href='/report/stock-report'>
            <div className='card2'>
                <h1 >Stock Report</h1>
            </div></Link>
        <Link href='/report/stock-valuation'>
            <div className='card2'>
                <h1 >Stock Valuation</h1>
            </div></Link>
        <Link href='/report/sold-product-report'>
            <div className='card2'>
                <h1 >Sold Product Report</h1>
            </div></Link>
        <Link href='/report/stock-alert-report'>
            <div className='card2'>
                <h1 >Stock Alert Report</h1>
            </div></Link>
        <Link href='/report/sfloating-stock-report'>
            <div className='card2'>
                <h1 >S.Floating Stock Report</h1>
            </div></Link>
        <Link href='/report/purchase-report'>
            <div className='card2'>
                <h1 >Purchase Report</h1>
            </div></Link>
        <Link href='/report/user-log'>
            <div className='card2'>
                <h1 >User Log</h1>
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

export default report;