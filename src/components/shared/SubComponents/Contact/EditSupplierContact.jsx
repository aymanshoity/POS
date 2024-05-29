
"use client"
import dynamic from "next/dynamic";

import { Input, Button, Checkbox, Col, DatePicker, Drawer, Form, Row, Select, message } from "antd";
import React, { useMemo, useState } from "react";
import 'react-quill/dist/quill.snow.css';
import { usePathname } from "next/navigation";
import { editContact } from "@/actions/ContactActions";
import { userStore } from "@/store/user";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
const { Option } = Select;
const EditContact = ({ID,refetch }) => {
   // console.log(ID)
   const axiosPublic = useAxiosPublic()
   const [loading, setLoading] = useState(true)
   const [form] = Form.useForm();
   const [value, setValue] = useState('');
   const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
   const [open, setOpen] = useState(false);
   const user = userStore(state => state.user)
   const token = user?.token
   const pathname = usePathname()
   // console.log(pathname)
   const list = pathname.split('/').pop()
   // console.log(list,token)



//   functions
   const showDrawer =async(id) => {
      console.log(id)
      setOpen(true);
      if(!!token && !!id){
         try {
            const res = await axiosPublic.get(`/api/contact/contact/${id}/`, {
                headers: {
                    'Authorization': `Token ${token}`,
                }
            })
            console.log(res.data)
            form.setFieldsValue(res.data)
            return res.data
        } catch (e) {
            console.log(e)
        }
      }
      
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
      editContact(ID,values, token).then(result => {
         console.log(result)
         setLoading(false)
         message.success('Contact Updated');
         refetch()
      })

   };
   const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
   };


   return (
      <div className=" ">
         <a href="#" onClick={()=>showDrawer(ID)}  type="primary">Edit</a>
         <Drawer
            title="Edit Contact"
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
            //   autoComplete="off"
               >
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
                           <Option value={3}>Local Supplier</Option>
                           <Option value={2}>Regular Supplier</Option>
                           <Option value={1}>Foreign Supplier</Option>

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
                           <Option value="Birthday">Birthday</Option>
                           <Option value="Wedding">Wedding</Option>
                           <Option value="Anniversary">Anniversary</Option>
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
                        <Checkbox>Active Contact!</Checkbox>
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

export default EditContact;
