"use client"
import React , { useRef, useState } from "react";
import BillingDetails from "@/components/shared/POSLayout/BillingDetails";
import CustomerDetails from "@/components/shared/POSLayout/CustomerDetails";
import Header from "@/components/shared/POSLayout/Header";
import OrderDetails from "@/components/shared/POSLayout/OrderDetails";
import Payment from "@/components/shared/POSLayout/Payment";
import ProductSearch from "@/components/shared/POSLayout/ProductSearch";
import { Button, Col, Row } from "antd";

import ReactToPrint from 'react-to-print';
const Pos = () => {
    let componentRef = useRef(0);
    const [reload, setReload]=useState(false);
    let invoiceDetails={
        salesWith:" ",
        salesTerminal:  " ",
        salesPerson:" ",
        lastInvoiceNo:" ",
        invoiceDate:" ",
        invoiceNo:" ",
    }
    return (
        <div>
            <div >
                <Header invoiceDetails={invoiceDetails}></Header>
            </div>

            <div >
                <Row >
                    <Col className="border  flex flex-col px-4  mx-auto" span={14}>
                        <ProductSearch></ProductSearch>
                        <OrderDetails></OrderDetails>
                        <Payment></Payment>
                    </Col>
                    <Col className="border flex flex-col px-4  mx-auto" span={10}>
                        <div>
                            <CustomerDetails></CustomerDetails>
                            <BillingDetails ></BillingDetails>

                            
                        </div>





                    </Col>

                </Row>

            </div>
        </div >
    );
};

export default Pos;


{/* <div className="border p-2 grid grid-cols-4 gap-5 my-4">

<Button className=" text-white bg-blue-700" >Void</Button>
<Button className=" text-white bg-red-600">Reprint</Button>
<ReactToPrint
    trigger={() => <Button className="bg-slate-800 text-white ">Pay Now</Button>}
    content={() =>componentRef}
/>

<Button className="bg-black text-white ">New Invoice</Button>


</div> */}