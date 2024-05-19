import Link from 'next/link';
import React from 'react';

const stock = () => {

    const subMenu=<>
    <Link  href='/stock/current-stock'>
    <div className='card2'>
                <h1 >Current Stock</h1>
            </div></Link>
    <Link  href='/stock/packaging-stock'>
    <div className='card2'>
                <h1 >Packaging Stock</h1>
            </div></Link>
    <Link  href='/stock/material-export'>
    <div className='card2'>
                <h1 >Material Stock</h1>
            </div></Link>
    <Link  href='/stock/stock-alert'>
    <div className='card2'>
                <h1 >Stock Alert</h1>
            </div></Link>
    <Link  href='/stock/stock-transfer'>
    <div className='card2'>
                <h1 >Stock Transfer</h1>
            </div></Link>
    <Link  href='/stock/transfer-history'>
    <div className='card2'>
                <h1 >Transfer History</h1>
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

export default stock;