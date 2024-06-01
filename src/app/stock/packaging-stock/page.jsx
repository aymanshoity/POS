"use client"

import RenderTable from "@/components/shared/SubComponents/Stock/RenderTable";
import { Col, Input, Row, Select } from "antd";
import { useState } from "react";
const { Option } = Select;
const PackagingStock = () => {
   const [value, setValue] = useState();
   const onChange = (newValue) => {
      setValue(newValue);
   };
   const onPopupScroll = (e) => {
      console.log('onPopupScroll', e);
   };

   return (
      <div className="mt-10">
         <Row className="mx-auto justify-evenly">
            <Col span={10}>
               <div className="cfd">
                  <h1 className="font-bold mb-3">Enter barcode or product code for instant Search</h1>
                  <Input />
               </div>
            </Col>
            <Col span={5}>
               <div className="cfd">
                  <h1 className="font-bold mb-3">Choose warehouse / outlet</h1>
                  <Select className="w-full">
                     <Option value="All">All</Option>
                     <Option>Main Office</Option>
                     <Option>Warehouse</Option>
                     <Option>Banani</Option>
                  </Select>
               </div>
            </Col>

         </Row>
         <Row>
            <Col span={24}>
               <RenderTable></RenderTable>
            </Col>
         </Row>


      </div>
   );
};

export default PackagingStock;