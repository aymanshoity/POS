"use client"
import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
const ServiceTable = () => {
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
         width: '10%',
      },
      {
         title: 'Invoice No',
         dataIndex: 'Invoice No',
         key: 'Invoice No',
         width: '20%',
         ...getColumnSearchProps('Invoice No'),
      },
      {
         title: 'Details',
         dataIndex: 'Details',
         key: 'Details',
         ...getColumnSearchProps('details'),

      },
      {
         title: 'Status',
         dataIndex: 'Status',
         key: 'Status',
         ...getColumnSearchProps('Status'),

      },
      {
         title: 'Delivery Date',
         dataIndex: 'Delivery Date',
         key: 'Delivery Date',
         ...getColumnSearchProps('Delivery Date'),

      },
      {
         title: 'Last Update',
         dataIndex: 'Last Update',
         key: 'Last Update',
         ...getColumnSearchProps('Last Update'),

      },
      {
         title: 'Action',
         dataIndex: '',
         key: 'x',
         render: () => <Space>
            <a>Update</a> | <a>Quick View</a>
         </Space>,
      },
   ];
   return <Table columns={columns}  />;
};

export default ServiceTable;