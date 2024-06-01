"use client"
import RenderTable from "@/components/shared/SubComponents/Stock/RenderTable";
import { Button, Col, Input, Row, Select } from "antd";
import { useState } from "react";
const { Option } = Select;
const StockAlert = () => {
   return (
      <div className="mt-10">
         <Row className="mx-auto justify-evenly">
            <Col span={10}>
               <div className="cfd">
                  <h1 className="font-bold mb-3">Enter barcode or product code for instant Search</h1>
                  <Input />
               </div>
            </Col>
         </Row>
         <Row>
            <Col className="rfd gap-5 my-5" span={24}>
                  <Button>Download</Button>
                  <Button type="primary">Print this Out</Button>
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

export default StockAlert;