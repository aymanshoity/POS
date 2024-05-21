"use client"
import { Col, Divider, Row, Select } from 'antd';
import React from 'react';

const Permissions = () => {
   const handleChange = (e) => {
      console.log(`selected ${e.target.value}`);
   };
   return (
      <div className='mt-5'>
         <div className='flex gap-5'>
            <h1>Select a Role: </h1>
            <Select

               style={{ width: 320 }}
               onChange={handleChange}
               options={[
                  { value: 'Admin', label: 'Admin' },
                  { value: 'Product Manager', label: 'Product Manager' },
                  { value: 'Sales Executive', label: 'Sales Executive' },
                  { value: 'Sales Account Manager', label: 'Sales Account Manager' },
                  { value: 'Factory In-Charge', label: 'Factory In-Charge' },
                  { value: 'Store In-charge', label: 'Store In-charge' },
                  { value: 'Karchupi Sample Man', label: 'Karchupi Sample Man' },
               ]}
            />
         </div>
         <Divider />
         <Row>
            <Col span={24}>
               <table className='table-fixed w-full border-collapse '>
                  <thead className='border'>

                     <tr>
                        <th>Module</th>
                        <th>Sub-Module</th>
                        <th>View</th>
                        <th>Create</th>
                        <th>Update</th>
                        <th>Delete</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>dsfef</td>
                     </tr>
                  </tbody>

               </table>

            </Col>
         </Row>


      </div>
   );
};

export default Permissions;