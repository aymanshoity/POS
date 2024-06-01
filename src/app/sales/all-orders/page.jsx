"use client"
import { Col, Divider, Input, Row, Select } from 'antd';
import React from 'react';
import { DatePicker, Space } from 'antd';
import OrdersTable from '@/components/shared/SubComponents/Sales/OrdersTable';
const { RangePicker } = DatePicker;
const AllOrders = () => {
   const handleChangeStatus = (value) => {
      console.log(`selected ${value}`);
   };
   const handleChangeOutlet = (value) => {
      console.log(`selected ${value}`);
   };
   return (
      <div className='mt-10'>
         <Row>
            <Col className='rfd gap-2' span={6}>
               <h1 className='font-bold'>Keyword:</h1>
               <Input />
            </Col>
            <Col className='rfd gap-2' span={8}>
               <h1 className='font-bold'>Issue Date</h1>
               <RangePicker />
            </Col>
            <Col className='rfd gap-2' span={4}>
               <h1 className='font-bold'>Status</h1>
               <Select
                  defaultValue="Status"
                  style={{
                     width: 180,
                  }}
                  onChange={handleChangeStatus}
                  options={[
                     {
                        value: 'All',
                        label: 'All',
                     },
                     {
                        value: 'Pending',
                        label: 'Pending',
                     },
                     {
                        value: 'Factory Received',
                        label: 'Factory Received',
                     },
                     {
                        value: 'Outlet Received',
                        label: 'Outlet Received',
                     },
                     {
                        value: 'Ready',
                        label: 'Ready',
                     },
                     {
                        value: 'Picked by Courier',
                        label: 'Picked by Courier',
                     },
                     {
                        value: 'Delivered',
                        label: 'Delivered',
                     },
                     {
                        value: 'Paid',
                        label: 'Paid',
                     },
                     {
                        value: 'Booked',
                        label: 'Booked',
                     },
                     {
                        value: 'Exchanged',
                        label: 'Exchanged',
                     },
                     {
                        value: 'Cancelled',
                        label: 'Cancelled',
                     },

                  ]}
               />
            </Col>
            <Col className='rfd gap-2' span={6}>
               <h1 className='font-bold'>Outlet</h1>
               <Select
                  defaultValue="Please select  an Outlet"
                  style={{
                     width: 180,
                  }}
                  onChange={handleChangeOutlet}
                  options={[
                     {
                        value: 'All',
                        label: 'All',
                     },
                     {
                        value: 'Main Office',
                        label: 'Main Office',
                     },
                     {
                        value: 'Banani',
                        label: 'Banani',
                     },



                  ]}
               />
            </Col>
         </Row>
         <Divider />
         <Row>
            <Col span={24}>
               <OrdersTable></OrdersTable>
            </Col>
         </Row>

      </div>
   );
};

export default AllOrders;