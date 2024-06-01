import { PlusOutlined } from "@ant-design/icons";
import { DatePicker, Button, Col, Divider, Drawer, Form, Input, Row, Select } from "antd";
import { useState } from "react";
import moment from "moment";
const AddCoupon = () => {
   const [open, setOpen] = useState(false);
   const [form] = Form.useForm();
   const { Option } = Select;
   const showDrawer = () => {
      setOpen(true);
   };
   const onClose = () => {
      setOpen(false);
   };

   const onFinish = (values) => {
      console.log('Success:', values);
      form.resetFields();
   };
   const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
   };
   return (
      <div className="flex justify-end ">
         <Button className="my-5" onClick={showDrawer} icon={<PlusOutlined />} type="primary">Add New Coupon</Button>
         <Drawer
            title="Create a new Coupon"
            width={550}
            onClose={onClose}
            open={open}
            styles={{
               body: {
                  paddingBottom: 80,
               },

            }}

         >
            <Form
               form={form}
               layout="vertical"
               onFinish={onFinish}
               onFinishFailed={onFinishFailed}
               autoComplete="off"
            >
               <Row>
                  <Col span={24}>
                     <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                           {
                              required: true,
                              message: 'Please enter Coupon Name!',
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
                        label="Type"
                        name="ref_type"
                        rules={[
                           {
                              required: true,
                              message: 'Please choose your Type!',
                           },
                        ]}
                     >
                        <Select placeholder="Please choose your Type">
                           <Option value={'A'}>Amount</Option>
                           <Option value={'P'}>Percentage</Option>
                        </Select>
                     </Form.Item>
                  </Col>
               </Row>
               <Row>
                  <Col span={24}>
                     <Form.Item
                        label="Amount"
                        name="amount"
                        rules={[
                           {
                              required: true,
                              message: 'Please input your Amount!',
                           },
                        ]}
                     >
                        <Input />
                     </Form.Item>
                  </Col>
               </Row>
               <Divider />

               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        label="Start"
                        name="start"
                        rules={[
                           {
                              required: true,
                              message: 'Please input your Start!',
                           },
                        ]}
                     >
                        <DatePicker style={{ width: "100%" }}
                           showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
                           format="YYYY-MM-DD HH:mm:ss" />
                     </Form.Item>

                  </Col>
                  <Col span={12}>
                     <Form.Item
                        label="End"
                        name="end"
                        rules={[
                           {
                              required: true,
                              message: 'Please input your End!',
                           },
                        ]}
                     >
                        <DatePicker style={{ width: "100%" }}
                           showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
                           format="YYYY-MM-DD HH:mm:ss" />
                     </Form.Item>


                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        label="Limit Type"
                        name="limit_type"
                        rules={[
                           {
                              required: true,
                              message: 'Please input your Limit Type!',
                           },
                        ]}
                     >
                        <Select>
                           <Option value={'Unlimited'}>Unlimited</Option>
                           <Option value={'Fixed Limit Amount'}>Fixed Limit Amount</Option>
                        </Select>
                     </Form.Item>

                  </Col>
                  <Col span={12}>
                     <Form.Item
                        label="Limit Amount"
                        name="limit"
                        rules={[
                           {
                              required: true,
                              message: 'Please input your Limit Amount!',
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
                        label="Status"
                        name="status"
                        rules={[
                           {
                              required: true,
                              message: 'Please Select status!',
                           },
                        ]}
                     >
                        <Select placeholder="Please choose your Type">
                           <Option value={'Active'}>Active</Option>
                           <Option value={'Deactivated'}>Deactivated</Option>
                        </Select>
                     </Form.Item>
                  </Col>
               </Row>





               <Form.Item
                  wrapperCol={{

                     span: 16,
                  }}
               >

                  <Button onClick={onClose} style={{ marginRight: 8 }}>
                     Cancel
                  </Button>
                  <Button type="primary" htmlType="submit">
                     Submit
                  </Button>
               </Form.Item>
            </Form>



         </Drawer>
      </div>
   );
};

export default AddCoupon;