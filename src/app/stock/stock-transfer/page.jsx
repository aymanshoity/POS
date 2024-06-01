"use client"
import { useState } from 'react';
import { Button, Col, Divider, Input, Row } from "antd";
import { TreeSelect } from 'antd';

const treeData = [
   {
      value: 'Main Office',
      title: 'Main Office',
      children: [
         {
            value: 'Warehouse',
            title: 'Warehouse',
         },
         {
            value: 'Banani',
            title: 'Banani',

         },
      ],
   },
];
const StockTransfer = () => {
   const [value, setValue] = useState();
   const onChange = (newValue) => {
      setValue(newValue);
   };
   const onPopupScroll = (e) => {
      console.log('onPopupScroll', e);
   };
   return (
      <div className="mt-10">
         <Row >
            <Col className='p-5' span={11}>
               <div className='rfd gap-5'>
                  <h1>From: </h1>
                  <TreeSelect
                     showSearch
                     style={{
                        width: '100%',
                     }}
                     value={value}
                     dropdownStyle={{
                        maxHeight: 400,
                        overflow: 'auto',
                     }}
                     placeholder="Please select"
                     allowClear
                     treeDefaultExpandAll
                     onChange={onChange}
                     treeData={treeData}
                     onPopupScroll={onPopupScroll}
                  />

               </div>
               <div className='mt-10'>
                  <h1 className='text-lg font-bold'>Add Product</h1>
                  <Input/>
               </div>
            </Col>
            <Col span={2}>
            </Col>
            <Col className="bg-base-200 rounded-lg p-5" span={11}>
            <div className='rfd gap-5'>
                  <h1>To: </h1>
                  <TreeSelect
                     showSearch
                     style={{
                        width: '100%',
                     }}
                     value={value}
                     dropdownStyle={{
                        maxHeight: 400,
                        overflow: 'auto',
                     }}
                     placeholder="Please select"
                     allowClear
                     treeDefaultExpandAll
                     onChange={onChange}
                     treeData={treeData}
                     onPopupScroll={onPopupScroll}
                  />

               </div>
               <div className='mt-10'>
                  <table className='border w-full'>
                     <thead>
                        <tr className='font-medium text-lg'>
                           <td>SL.</td>
                           <td>Product</td>
                           <td>Details</td>
                           <td>Quantity</td>
                           <td>Action</td>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>

                        </tr>
                     </tbody>
                  </table>
               </div>
               <Divider/>
               <Button type='primary'> Submit</Button>
            </Col>
         </Row>
      </div>
   );
};

export default StockTransfer;