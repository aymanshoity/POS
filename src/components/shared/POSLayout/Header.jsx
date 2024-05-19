"use client"

import { Form } from "antd";

const Header = ({invoiceDetails}) => {
    console.log(invoiceDetails)
    function formatDate(date) {

        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        return `${day}/${month}/${year}`

    }
    function getDateString(date) {

        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        return `${day}${month}${year}`

    }
    const date = new Date()
    const time = date.getTime()
    const formatedDate = formatDate(date)
    const dateString = getDateString(date)
    const InvoiceNo = `${dateString}${time}`
    console.log(time)
    console.log(formatedDate)

    const handleInvoiceDetails=(e)=>{
        console.log(invoiceDetails)
    }
    return (
        <div className="mt-10 ">
            <Form
                // form={form}
                layout="vertical"
                className="grid grid-cols-2 md:grid-cols-3  xl:grid-cols-6 gap-6 "

            >
                <Form.Item className="relative " label="Sales With">
                    <select onChange={e=>handleInvoiceDetails(invoiceDetails.salesWith =e.target.value)} defaultValue="Barcode" className="peer ">
                        <option   value="Barcode">Barcode</option>
                        <option value="RFID">RFID</option>



                    </select>
                </Form.Item>
                <Form.Item className="relative " label="Sales Terminal">
                   
                    <select onChange={e=>handleInvoiceDetails(invoiceDetails.salesTerminal =e.target.value)} defaultValue="Terminal 1" className="peer ">
                        <option value="Terminal 1">Terminal 1</option>
                        <option value="Terminal 2">Terminal 2</option>
                        <option value="Terminal 3">Terminal 3</option>
                        <option value="Terminal 4">Terminal 4</option>

                    </select>
                    
                </Form.Item>
                <Form.Item  className="relative " label="Sales Person">
                    <select onChange={e=>handleInvoiceDetails(invoiceDetails.salesPerson =e.target.value)} defaultValue="Terminal 1"  className="peer w-max">
                        <option  value="Jorina">Jorina</option>
                        <option value="Morjina">Morjina</option>
                        <option value="Amena">Amena</option>


                    </select>

                </Form.Item>
                <Form.Item className="relative " label="Last Invoice No.">
                    <input onChange={e=>handleInvoiceDetails(invoiceDetails.lastInvoiceNo =e.target.value)} className="peer " type="text" id='navigate_ui_input_44' />
                </Form.Item>
                <Form.Item className="relative " label="Invoice Date">
                    <input onChange={e=>handleInvoiceDetails(invoiceDetails.invoiceDate =e.target.value)} defaultValue={formatedDate} className="peer " type="text" id='navigate_ui_input_44' />
                </Form.Item>
                <Form.Item className="relative " label="Invoice No.">
                    <input onChange={e=>handleInvoiceDetails(invoiceDetails.invoiceNo =e.target.value)} defaultValue={InvoiceNo} className="peer " type="text" id='navigate_ui_input_44' />
                </Form.Item>


            </Form>
        </div>
    );
};

export default Header;