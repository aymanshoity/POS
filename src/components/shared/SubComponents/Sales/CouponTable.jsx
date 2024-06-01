"use client"
import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import CouponDetails from './CouponDetails';
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
       title: 'SL.',
       dataIndex: 'SL.',
       key: 'SL.',
       width: '5%',
       
     },
     {
       title: ' Name',
       dataIndex: ' Name',
       key: ' Name',
       width: '15%',
       ...getColumnSearchProps('name'),
     },
     {
       title: 'Amount',
       dataIndex: 'Amount',
       key: 'Amount',
       width: '15%',
       
     },
     {
       title: 'Status',
       dataIndex: 'Status',
       key: 'Status',
       width: '15%',
       
     },
     {
       title: 'Start Date',
       dataIndex: 'Start Date',
       key: 'Start Date',
       width: '10%',
       
     },
     {
       title: 'End Date',
       dataIndex: 'End Date',
       key: 'End Date',
       width: '10%',
       
     },
     {
       title: 'Remaining Coupons',
       dataIndex: 'Remaining Coupons',
       key: 'Remaining Coupons',
       width: '15%',
       
     },
     {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_,details) => {
        return <CouponDetails></CouponDetails>
      }
   },
     
   ];
   return <Table columns={columns}  />;
};

export default DraftCostSheetTable;