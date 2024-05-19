"use client"
import { Table } from 'antd';

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
    email: 'mike@xyz.com',
    type: 'regular',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
    email: 'aymanshoity@gmail.com',
    type: 'foreign',
  },
];



const Sample = () => {

   
   const columns = [
      {
        title: 'Details',
        dataIndex: 'details',
        key: 'details',
        render: (_, record) => (
          <div>
            <div className='flex '><div className='flex-1'><strong>Name</strong></div> <div className='flex-1'>{record.name}</div></div>


            <div className='flex '><div className='flex-1 '><strong>Age</strong></div> <div className='flex-1 '>{record.age}</div></div>


            <div className='flex '><div className='flex-1 '><strong>Address</strong></div> <div className='flex-1 '> {record.address}</div></div>

            <div className='flex '><div className='flex-1 '><strong>Email</strong></div><div className='flex-1 '> {record.email}</div></div>

            <div className='flex '><div className='flex-1 '><strong>Type</strong></div> <div className='flex-1 '>{record.type}</div></div>
          </div>
        ),
      },
      {
         title: 'Action',
         dataIndex: 'action',
         key: 'action',
         render: () => <a>Vew Details</a>,
       },
    ];
   return (
      <div className='cfd'>
         
         <Table style={{width:300}} dataSource={dataSource} columns={columns} rowKey="key" />;
      </div>
   );
};

export default Sample;