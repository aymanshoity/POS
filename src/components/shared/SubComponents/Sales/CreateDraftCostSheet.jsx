import { PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, DatePicker, Drawer, Form, Input, InputNumber, Row } from "antd";
import { useMemo, useState } from "react";
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";

const CreateDraftCostSheet = () => {
   const [open, setOpen] = useState(false);
   const [form] = Form.useForm();
   const [value, setValue] = useState('');
   const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
   const showDrawer = () => {
      setOpen(true);
   };
   const onClose = () => {
      setOpen(false);

   };

   const onFinish = (values) => {
      console.log('Success:', values);
   };
   const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
   };

 
   return (
      <div className="flex justify-end">
         <Button className="mb-5" icon={<PlusOutlined />} type="primary" onClick={showDrawer}>New Draft Cost Sheet</Button>
         <Drawer
            title="Create a New Draft Cost Sheet"
            width={720}
            onClose={onClose}
            open={open}>
            <Form
               form={form}
               layout="vertical"
               name="basic"
               onFinish={onFinish}
               onFinishFailed={onFinishFailed}
               autoComplete="off"
            >
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        label="Style Name"
                        name="style_name"
                        rules={[
                           {
                              required: true,
                              message: 'Please input your Style Name!',
                           },
                        ]}
                     >
                        <Input />
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item
                        label="Style Code"
                        name="style_code"
                        rules={[
                           {
                              required: true,
                              message: 'Please input your Style Code!',
                           },
                        ]}
                     >
                        <Input />
                     </Form.Item>
                  </Col>

               </Row>
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        label="Client Name"
                        name="client_name"
                        rules={[
                           {
                              required: true,
                              message: 'Please input your Client Name!',
                           },
                        ]}
                     >
                        <Input />
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item
                        label="Designer Name"
                        name="designer_name"
                        rules={[
                           {
                              required: true,
                              message: 'Please input your Designer Name!',
                           },
                        ]}
                     >
                        <Input />
                     </Form.Item>
                  </Col>

               </Row>

               <Row>
                  <Col span={24}>
                     <Form.Item
                        label="Description "
                        name="description"
                        rules={[
                           {
                              required: true,
                              message: 'Please input your Description !',
                           },
                        ]}
                     >
                        <ReactQuill theme="snow" value={value} onChange={setValue} />
                     </Form.Item>
                  </Col>
               </Row>

               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        label="Order Date"
                        name="order_date"
                        rules={[
                           {
                              required: true,
                              message: 'Please input your Order Date!',
                           },
                        ]}
                     >
                         <DatePicker className="w-full"  />
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item
                        label="Quantity"
                        name="quantity"
                        rules={[
                           {
                              required: true,
                              message: 'Please input your Quantity!',
                           },
                        ]}
                     >
                        <InputNumber className="w-full" min={1}  />
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        label="Net Cost Price"
                        name="net_cost_price"
                        rules={[
                           {
                              required: true,
                              message: 'Please input your Net Cost Price!',
                           },
                        ]}
                     >
                        <Input disabled />
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item
                        label="Profit Percentage"
                        name="profit_percentage"
                        initialValue={1}
                        
                     >
                        <InputNumber className="w-full" min={1}  />
                     </Form.Item>
                  </Col>
               </Row>

               <Row>
                  <Col span={24}>
                     <Form.Item
                        label="Net Selling Price "
                        name="net_selling_price"
                        rules={[
                           {
                              required: true,
                              message: 'Please input your Net Selling Price !',
                           },
                        ]}
                     >
                       <Input disabled/>
                     </Form.Item>
                  </Col>
               </Row>
















               <Form.Item
                  wrapperCol={{

                     span: 16,
                  }}
               >
                  <Button type="primary" htmlType="submit">
                     Submit
                  </Button>
               </Form.Item>
            </Form>
         </Drawer>
      </div>
   );
};

export default CreateDraftCostSheet;