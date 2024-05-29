"use client"
import { NextApiRequest, NextApiResponse } from 'next';
import dynamic from "next/dynamic";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, DatePicker, Table, Row, Col, Form, Select, Drawer, Checkbox, Typography } from "antd";
import React, { useMemo, useRef, useState } from "react";
import Highlighter from 'react-highlight-words';
const { Option } = Select;
import 'react-quill/dist/quill.snow.css';
import CreateSupplier from "@/components/shared/SubComponents/Contact/CreateSupplier";
import useAxiosPublic from "@/components/shared/Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { userStore } from "@/store/user";
import * as XLSX from "xlsx";
import EditSupplierContact from '@/components/shared/SubComponents/Contact/EditSupplierContact';
import SupplierHistory from '@/components/shared/SubComponents/Contact/SupplierHistory';
// rowSelection object indicates the need for row selection
const rowSelection = {
   onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
   },

};
const Supplier = () => {
   const [form] = Form.useForm();
   const [value, setValue] = useState('');
   const [selectionType, setSelectionType] = useState('checkbox');
   const [searchText, setSearchText] = useState('');
   const [searchedColumn, setSearchedColumn] = useState('');
   const searchInput = useRef(null);
   const axiosPublic = useAxiosPublic()
   const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
   const user = userStore(state => state.user)
   const token = user?.token
   console.log(token)


   const { data: supplierContact = [], refetch, isLoading } = useQuery({
      queryKey: ['supplierContact'],
      enabled: !!token,
      queryFn: async () => {
         try {
            const res = await axiosPublic.get(`/api/contact/contact/?Type=Supplier`, {
               headers: {
                  'Authorization': `Token ${token}`,
               }
            })
            console.log(res.data)
            return res.data
         } catch (e) {
            console.log(e)
         }
      },


   })

 
   const onFinish = (values) => {
      console.log('Success:', values);
      form.resetFields();
   };
   const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
   };

   const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
   };
   const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText('');
   };
   const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
         <div
            style={{
               padding: 8,
            }}
            onKeyDown={(e) => e.stopPropagation()}
         >
            <Input
               ref={searchInput}
               placeholder={`Search ${dataIndex}`}
               value={selectedKeys[0]}
               onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
               onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
               style={{
                  marginBottom: 8,
                  display: 'block',
               }}
            />
            <Space>
               <Button
                  type="primary"
                  onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                  icon={<SearchOutlined />}
                  size="small"
                  style={{
                     width: 90,
                  }}
               >
                  Search
               </Button>
               <Button
                  onClick={() => clearFilters && handleReset(clearFilters)}
                  size="small"
                  style={{
                     width: 90,
                  }}
               >
                  Reset
               </Button>
               <Button
                  type="link"
                  size="small"
                  onClick={() => {
                     confirm({
                        closeDropdown: false,
                     });
                     setSearchText(selectedKeys[0]);
                     setSearchedColumn(dataIndex);
                  }}
               >
                  Filter
               </Button>

            </Space>
         </div>
      ),
      filterIcon: (filtered) => (
         <SearchOutlined
            style={{
               color: filtered ? '#1677ff' : undefined,
            }}
         />
      ),
      onFilter: (value, record) =>
         record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
         if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
         }
      },
      render: (text) =>
         searchedColumn === dataIndex ? (
            <Highlighter
               highlightStyle={{
                  backgroundColor: '#ffc069',
                  padding: 0,
               }}
               searchWords={[searchText]}
               autoEscape
               textToHighlight={text ? text.toString() : ''}
            />
         ) : (
            text
         ),
   });

   const columns = [
      {
         title: 'Name',
         dataIndex: 'name',
         key: 'name',
         width: '15%',
         ...getColumnSearchProps('name'),
      },
      {
         title: 'Phone',
         dataIndex: 'phone',
         key: 'phone',
         width: '15%',
         ...getColumnSearchProps('phone'),
      },
      {
         title: 'Address',
         dataIndex: 'address',
         key: 'address',
         width: '25%',
         ...getColumnSearchProps('address'),
         sorter: (a, b) => a.address.length - b.address.length,
         sortDirections: ['descend', 'ascend'],
      },
      {
         title: 'Email',
         dataIndex: 'email',
         key: 'email',
         width: '15%',
         ...getColumnSearchProps('email'),
      },
      {
         title: 'Type',
         dataIndex: 'role',
         key: 'role',
         width: '10%',
         ...getColumnSearchProps('role'),
      },
      {
         title: 'Action',
         dataIndex: 'action',
         key: 'action',
         render: (_, details) => {
            console.log(details)
            return <Space className="flex lg:flex-row md:flex-col  items-start">
               <EditSupplierContact refetch={refetch} ID={details.id}></EditSupplierContact> |
               <SupplierHistory token={token} refetch={refetch} ID={details.id}></SupplierHistory>
               
            </Space>
         }
      },
   ];

   const MobileColumns = [
      {
         title: 'Details',
         dataIndex: 'details',
         width: '55%',
         key: 'details',
         render: (_, record) => (
            <div className="">
               <div className='flex '>
                  <div className='flex-1 w-2/5'><strong>Name</strong></div>
                  <div className='flex-1 w-1/2'>{record.name}</div>
               </div>


               <div className='flex '>
                  <div className='flex-1 w-1/2'><strong>Age</strong></div>
                  <div className='flex-1 w-1/2'>{record.age}</div>
               </div>


               <div className='flex '>
                  <div className='flex-1 w-1/2'><strong>Address</strong></div>
                  <div className='flex-1 w-1/2'> {record.address}</div>
               </div>

               <div className='flex '>
                  <div className='flex-1 w-1/2 '><strong>Email</strong></div>
                  <div className='flex-1 w-1/2 '><p className=" break-words">{record.email}</p></div>
               </div>

               <div className='flex '>
                  <div className='flex-1 w-1/2' ><strong>Type</strong></div>
                  <div className='flex-1  w-1/2'>{record.type}</div>
               </div>
            </div>
         ),
      },
      {
         title: 'Action',
         dataIndex: 'action',
         width: '45%',
         key: 'action',
         render: (_, details) => {
            console.log(details)
            return <Space className="flex lg:flex-row md:flex-col  items-start">
               <EditSupplierContact refetch={refetch} ID={details.id}></EditSupplierContact> |
               <SupplierHistory refetch={refetch} ID={details.id}></SupplierHistory>
               
            </Space>
         }
      },
   ];

   // drawer
   const [open, setOpen] = useState(false);
   const showDrawer = () => {
      setOpen(true);
   };
   const onClose = () => {
      setOpen(false);
      
   };
   

   if (isLoading) {
      return <div className="w-10 h-10 flex gap-2 items-center justify-center"><div className="w-2 h-5 animate-[ping_1.4s_linear_infinite] bg-blue-800"></div><div className="w-2 h-5 animate-[ping_1.8s_linear_infinite] bg-blue-800"></div><div className="w-2 h-5 animate-[ping_2s_linear_infinite] bg-blue-800"></div></div>

   }
   const onGetExportProduct = (title = 'Supplier', worksheetName = 'SupplierExport') => {
      const dataToExport = supplierContact?.map((contact) => ({
         Name: contact?.name,
         Phone: contact?.phone,
         Email: contact?.email,
         Address: contact?.address,
         Type: contact?.role,
      }));

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);
      XLSX.writeFile(workbook, `${title}.xlsx`);
      console.log(`Exported data to ${title}.xlsx`);
   };

   return (
      <div className=" mt-10 ">
         <CreateSupplier refetch={refetch} ></CreateSupplier>

         <Button onClick={() => onGetExportProduct("Supplier", "SupplierExport")} type="primary">Download Excel Data</Button>


         {/*  */}

         <div className="mt-5">
            {!isLoading && <Table
               rowSelection={{
                  type: selectionType,
                  ...rowSelection,
               }}
               className="hidden sm:table mt-5"
               columns={columns}
               dataSource={supplierContact}
            />}

            <Table className=" md:hidden  lg:hidden " dataSource={supplierContact} columns={MobileColumns} rowKey="key" />;

         </div>
         


      </div>
   );
};

export default Supplier;