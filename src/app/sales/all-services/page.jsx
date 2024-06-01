
"use client"
import ServiceTable from '@/components/shared/SubComponents/Sales/ServiceTable';
import { Col, Divider, Input, Row, Select } from 'antd';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
const AllServices = () => {
   const handleChange = (value) => {
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
            
            <Col className='rfd gap-2' span={6}>
               <h1 className='font-bold'>Outlet</h1>
               <Select
                  defaultValue=""
                  style={{
                     width: 180,
                  }}
                  onChange={handleChange}
                  options={[
                     {
                        value: 'All',
                        label: 'All',
                     },
                    

                  ]}
               />
            </Col>
         </Row>
         <Divider />
         <Row>
            <Col span={24}>
                  <ServiceTable></ServiceTable>
            </Col>
         </Row>
      </div>
   );
};

export default AllServices;