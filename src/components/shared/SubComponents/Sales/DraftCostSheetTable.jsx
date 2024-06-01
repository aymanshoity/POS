"use client"
import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
const DraftCostSheetTable = () => {
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
       title: 'Id',
       dataIndex: 'Id',
       key: 'Id',
       width: '5%',
       
     },
     {
       title: 'Style Name',
       dataIndex: 'Style Name',
       key: 'Style Name',
       width: '15%',
       ...getColumnSearchProps('Style Name'),
     },
     {
       title: 'Style Code',
       dataIndex: 'Style Code',
       key: 'Style Code',
       width: '15%',
       
     },
     {
       title: 'Client Name',
       dataIndex: 'Client Name',
       key: 'Client Name',
       width: '15%',
       
     },
     {
       title: 'Quantity',
       dataIndex: 'Quantity',
       key: 'Quantity',
       width: '5%',
       
     },
     {
       title: 'Net Total Cost',
       dataIndex: 'Net Total Cost',
       key: 'Net Total Cost',
       width: '15%',
       
     },
     {
       title: 'Net Selling Price',
       dataIndex: 'Net Selling Price',
       key: 'Net Selling Price',
       width: '15%',
       
     },
     {
       title: 'Order Date',
       dataIndex: 'Order Date',
       key: 'Order Date',
       width: '15%',
       
       
     },{
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <Space>
         <a>Update</a> 
      </Space>,
   },
     
   ];
   return <Table columns={columns}  />;
};

export default DraftCostSheetTable;