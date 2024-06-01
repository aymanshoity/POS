"use client"

import RenderTable from "@/components/shared/SubComponents/Stock/RenderTable";
import { Col, Input, Row, Select, TreeSelect } from "antd";
import { useState } from "react";
const { Option } = Select;
const CurrentStock = () => {
   const [value, setValue] = useState();
   const onChange = (newValue) => {
      setValue(newValue);
   };
   const onPopupScroll = (e) => {
      console.log('onPopupScroll', e);
   };
   const treeData = [
      {
         value: 'Clothing',
         title: 'CLOTHING',
         children: [
            {
               value: "MEN'S WEAR",
               title: "MEN'S WEAR",
               children: [
                  {
                     value: 'leaf1',
                     title: 'Sherwani',
                     children: [
                        {
                           value: "Full Sherwani",
                           title: 'Full Sherwani'
                        },
                     ]
                  },
                  {
                     value: 'Suite',
                     title: 'Suite',
                  },

               ],
            },
            {
               value: 'parent 1-1',
               title: "WOMEN'S WEAR",
               children: [
                  {
                     value: 'le1',
                     title: "KID'S WEAR",
                  },
                  {
                     value: '',
                     title: "Customization",
                  },

               ],
            },
         ],
      },
   ];
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
            <Col span={6}>
               <div className="cfd">
                  <h1 className="font-bold mb-3">Choose Category To Filter</h1>
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

export default CurrentStock;