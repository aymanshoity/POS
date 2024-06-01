"use client"

import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
const RenderTable = () => {
   const [searchText, setSearchText] = useState('');
   const [searchedColumn, setSearchedColumn] = useState('');
   const searchInput = useRef(null);
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
           <Button
             type="link"
             size="small"
             onClick={() => {
               close();
             }}
           >
             close
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
       title: 'SL.',
       dataIndex: 'SL.',
       key: 'sl.',
       width: '5%',
      
     },
     {
       title: 'Image',
       dataIndex: 'Image',
       key: 'image',
       width: '10%',
       
     },
     {
       title: 'Barcode',
       dataIndex: 'Barcode',
       key: 'barcode',
       width: '15%',
       ...getColumnSearchProps('barcode'),
     },
     {
       title: 'Product',
       dataIndex: 'Product',
       key: 'product',
       width: '15%',
       ...getColumnSearchProps('product'),
     },
     {
       title: 'Category',
       dataIndex: 'Category',
       key: 'category',
       width: '15%',
       ...getColumnSearchProps('category'),
      
     },
     {
       title: 'Variation',
       dataIndex: 'Variation',
       key: 'variation',
       width: '10%',
       ...getColumnSearchProps('variation'),
      
     },
     {
       title: 'Quantity',
       dataIndex: 'Quantity',
       key: 'quantity',
       width: '10%',
      
     },
     {
       title: 'Selling Price',
       dataIndex: 'Selling Price',
       key: 'selling price',
       width: '10%',
      
     },
     {
       title: 'Location',
       dataIndex: 'Location',
       key: 'location',
       width: '10%',
       ...getColumnSearchProps('location'),
      
     },
     
   ];
   return (
      <div className='mt-10'>
        <Table columns={columns}  />;

      </div>
   );
};

export default RenderTable;