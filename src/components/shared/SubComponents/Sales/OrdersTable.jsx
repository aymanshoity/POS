import React from 'react';
import { Space, Table } from 'antd';

const columns = [
   {
      title: 'SL.',
      dataIndex: 'SL.',
      key: 'SL.',
   },
   {
      title: 'Invoice No',
      dataIndex: 'Invoice No',
      key: 'Invoice No',
   },
   {
      title: 'Order No',
      dataIndex: 'Order No',
      key: 'Order No',
   },
   {
      title: 'Contact',
      dataIndex: 'Contact',
      key: 'Contact',
   },
   {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
   },
   {
      title: 'Location',
      dataIndex: 'Location',
      key: 'Location',
   },
   {
      title: 'Issued Date',
      dataIndex: 'Issued Date',
      key: 'Issued Date',
   },
   {
      title: 'Delivery Date',
      dataIndex: 'Delivery Date',
      key: 'Delivery Date',
   },
   {
      title: 'Remarks',
      dataIndex: 'Remarks',
      key: 'Remarks',
   },
   {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <Space>
         <a>Update</a> | <a>Invoices</a>
      </Space>,
   },
];
const data = [
   {
      key: 1,
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
   },]
const OrdersTable = () => {
   return (
      <Table
         columns={columns}
         expandable={{
            expandedRowRender: (record) => (
               <p
                  style={{
                     margin: 0,
                  }}
               >
                  {record.description}
               </p>
            ),
            rowExpandable: (record) => record.name !== 'Not Expandable',
         }}
         dataSource={data}
      />
   );
};

export default OrdersTable;