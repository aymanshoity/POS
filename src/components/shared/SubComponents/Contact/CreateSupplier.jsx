"use client"
import dynamic from "next/dynamic";
import { PlusOutlined } from "@ant-design/icons";
import {message, Input, Button, Checkbox, Col, DatePicker, Drawer, Form, Row, Select } from "antd";
import React, { useMemo, useState } from "react";
import 'react-quill/dist/quill.snow.css';
import { usePathname } from "next/navigation";
import { createContact, getAllContact } from "@/actions/ContactActions";
import { userStore } from "@/store/user";
const { Option } = Select;
import dayjs from 'dayjs';

const CreateSupplier = ({ refetch }) => {
   const [loading, setLoading] = useState(true)
   const [form] = Form.useForm();
   const [value, setValue] = useState('');
   const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
   const [open, setOpen] = useState(false);
   const user = userStore(state => state.user)
   const token = user?.token
   const pathname = usePathname()
   console.log(pathname)
   const list = pathname.split('/').pop()
   console.log(list)
   const showDrawer = () => {
      setOpen(true);
   };
   const onClose = () => {
      setOpen(false);
   };
   const onFinish = (values) => {
      values.Type = list.charAt(0).toUpperCase()+list.slice(1);
      console.log('Success:', values);
      if (values.special_dates) {
         const specialDate = values.special_dates
         const date = specialDate.toDate()
         console.log(specialDate.toDate())
         const options = { month: 'long', day: 'numeric' };
         const formattedDate = date.toLocaleDateString('en-US', options);
         values.special_dates = formattedDate;
      }
      console.log(token)
      setLoading(true)
      createContact(values, token).then(result => {
         console.log(result)
         setLoading(false)
         form.resetFields();
         message.success('Supplier Created Successfully');
         refetch()
      })

   };
   const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
   };

   
   return (
      <div className="flex md:justify-end mb-5">
         <Button onClick={showDrawer} icon={<PlusOutlined />} type="primary"> New Customer</Button>
         <Drawer
            title="Create a new Contact"
            width={720}
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
               autoComplete="off">
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        name="name"
                        label="Name"

                     >
                        <Input placeholder="Please enter user name" />
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item
                        name="email"
                        label="Email"

                     >
                        <Input
                           style={{
                              width: '100%',
                           }}
                           addonBefore="@"
                           placeholder="Please enter email"
                        />
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                           {
                              required: true,
                              message: 'Please enter phone number',
                           },
                        ]}
                     >
                        <Input placeholder="Please enter phone number" />
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item
                        name="role"
                        label="Type"

                     >
                        <Select placeholder="Please choose the type">
                           <Option value={1}>Local Supplier</Option>
                           <Option value={2}>Regular Supplier</Option>
                           <Option value={3}>Foreign Supplier</Option>
                          
                        </Select>
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        name="Special_Date_Type"
                        label="Special Date Types"

                     >
                        <Select placeholder="Please choose the type">
                           <Option value="birthday">Birthday</Option>
                           <Option value="wedding">Wedding</Option>
                           <Option value="anniversary">Anniversary</Option>
                           <Option value="Others">Others</Option>

                        </Select>
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item
                        name="special_dates"
                        label="Special Date"

                     >
                        <DatePicker
                           style={{
                              width: '100%',
                           }}
                           getPopupContainer={(trigger) => trigger.parentElement}
                        />
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={24}>
                     <Form.Item
                        name="address"
                        label="Address"

                     >
                        <Input.TextArea rows={1} placeholder="please enter your address" />
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={24}>

                     <Form.Item
                        name="remarks"
                        label="Remarks"
                        className="rounded-xl"
                     >
                        <ReactQuill theme="snow" value={value} onChange={setValue} />
                     </Form.Item>

                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={16}>
                     <Form.Item
                        name="is_active"
                        valuePropName="checked"

                     >
                        <Checkbox>Active Supplier!</Checkbox>
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={24}>
                  <Col span={4}>
                     <Form.Item

                     >
                        <Button onClick={onClose}>Cancel</Button>


                     </Form.Item>
                  </Col>
                  <Col span={[12 - 24]}>
                     <Form.Item

                     >

                        <Button htmlType="submit" type="primary">
                           Submit
                        </Button>

                     </Form.Item>
                  </Col>
               </Row>
            </Form>
         </Drawer>
      </div>
   );
};

export default CreateSupplier;