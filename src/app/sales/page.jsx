import Link from 'next/link';
import React from 'react';

const sales = () => {

    const subMenu = <>
        <Link href='/sales/add-new-order'>
            <div className='card2'>
                <h1 >Add New Order</h1>
            </div></Link>
        <Link href='/sales/all-orders'>
            <div className='card2'>
                <h1 >All Orders</h1>
            </div></Link>
        <Link href='/sales/draft-cost-sheet'>
            <div className='card2'>
                <h1 >Draft Cost Sheet</h1>
            </div></Link>
        <Link href='/sales/coupons'>
            <div className='card2'>
                <h1 >Coupons</h1>
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

export default sales;