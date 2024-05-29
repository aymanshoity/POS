"use client"
import * as XLSX from "xlsx";
import { Button, Divider, Select, Table, Upload } from "antd";
import { useState } from "react";
const props = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

const columns = [
    {
        title: 'Customer/Supplier',
        dataIndex: 'customer/supplier',
        key: 'customer/supplier',
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Emergency Contact',
        dataIndex: 'emergencyContact',
        key: 'emergencyContact',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Special Date Type',
        dataIndex: 'specialDateType',
        key: 'specialDateType',

    },
    {
        title: 'Special Date',
        dataIndex: 'specialDate',
        key: 'specialDate',
    },
]


const Import_Export = () => {
    const [data, setData] = useState([])
    const handleImport = (e) => {
        console.log(e)
        const file = e.target.files[0];
        console.log(e.target.files[0])
        const reader = new FileReader()
        reader.onload = (event) => {
            const bstr = event.target.result;
            console.log(bstr)
            const workBook = XLSX.read(bstr, { type: 'binary' })
            const workSheetName = workBook.SheetNames[0]
            const workSheet = workBook.Sheets[workSheetName]
            const fileData = XLSX.utils.sheet_to_json(workSheet)
            setData(fileData)
        }
        reader.readAsBinaryString(file);

    }
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    return (
        <div className="mt-10">
            <div>
                <h1 className="font-semibold">Export</h1>
                <div className="flex gap-10">
                    <h1>Select Content Type</h1>
                    <Select

                        style={{
                            width: 220,
                        }}
                        onChange={handleChange}
                        options={[
                            {
                                value: 'all',
                                label: 'All',
                            },
                            {
                                value: 'allCustomer',
                                label: 'All Customer',
                            },
                            {
                                value: 'customer-VIP-Customer',
                                label: 'Customer-VIP Customer',
                            },
                            {
                                value: 'customer-Regular-Customer',
                                label: 'Customer-Regular Customer',
                            },
                            {
                                value: 'customer-Foreign-Customer',
                                label: 'Customer-Foreign Customer',
                            },
                            {
                                value: 'customer-Online-Customer',
                                label: 'Customer-Online Customer',
                            },
                            {
                                value: 'allSupplier',
                                label: 'All Supplier',
                            },
                            {
                                value: 'supplier-Local-Supplier',
                                label: 'Supplier-Local Supplier',
                            },
                            {
                                value: 'supplier-Foreign-Supplier',
                                label: 'Supplier-Foreign Supplier',
                            },
                            {
                                value: 'supplier-Regular-Supplier',
                                label: 'Supplier-Regular Supplier',
                            },


                        ]}
                    />
                    <Button type="primary">Download Excel Data</Button>
                </div>
            </div>
            <Divider />
            <div>
                <h1 className="font-semibold">Import</h1>
                <div className="flex gap-5">
                    <input accept=".xlsx, .xls" onChange={handleImport} type="file" className="file-input-bordered w-full max-w-xs" />
                    <Button type="primary" > Upload</Button>
                </div>
                <pre>{JSON.stringify(data, null, 2)}</pre>

            </div>

            <div>
                <table className="w-full rounded-lg  border mx-auto border-gray-100  my-6">
                    <thead className="">
                        <tr className="bg-base-200 ">
                            <th className="py-3 px-6 border-b">Customer/Supplier</th>
                            <th className="py-3 px-6 border-b">Type</th>
                            <th className="py-3 px-6 border-b">Name</th>
                            <th className="py-3 px-6 border-b">Email</th>
                            <th className="py-3 px-6 border-b">Phone</th>
                            <th className="py-3 px-6 border-b">Emergency Contact</th>
                            <th className="py-3 px-6 border-b">Address</th>
                            <th className="py-3 px-6 border-b">Special Date Type</th>
                            <th className="py-3 px-6 border-b">Special Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-gray-50 transition duration-300">

                        </tr>

                    </tbody>
                </table>

            </div>
        </div>


    );
};

export default Import_Export;