"use client"
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Drawer, Form, Row } from 'antd';
import { Input } from 'postcss';
import React, { useState } from 'react';
import { Tree } from 'antd';

const initTreeData = [
   {
      title: 'Expand to load',
      key: '0',
   },
   {
      title: 'Expand to load',
      key: '1',
   },
   {
      title: 'Tree Node',
      key: '2',
      isLeaf: true,
   },
];

const updateTreeData = (list, key, children) =>
   list.map((node) => {
     if (node.key === key) {
       return {
         ...node,
         children,
       };
     }
     if (node.children) {
       return {
         ...node,
         children: updateTreeData(node.children, key, children),
       };
     }
     return node;
   });
const OfficeLocation = () => {
   const [treeData, setTreeData] = useState(initTreeData);
   const [form] = Form.useForm();
   const onFinish = (values) => {
      console.log('Success:', values);
      form.resetFields();
   };
   const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
   };
   const [open, setOpen] = useState(false);
   const [showDetails, setShowDetails] = useState(false);
   const [showEdit, setShowEdit] = useState(false);
   const showDrawer = () => {
      setOpen(true);
   };
   const onClose = () => {
      setOpen(false);
      setShowDetails(false)
   };
   const CloseEdit = () => {

      setShowEdit(false)
   };


   const handleShowDetails = () => {
      setShowDetails(true)
   }
   const handleShowEdit = () => {
      setShowEdit(true)
   }
   const onLoadData = ({ key, children }) =>
      new Promise((resolve) => {
        if (children) {
          resolve();
          return;
        }
        setTimeout(() => {
          setTreeData((origin) =>
            updateTreeData(origin, key, [
              {
                title: 'Child Node',
                key: `${key}-0`,
              },
              {
                title: 'Child Node',
                key: `${key}-1`,
              },
            ]),
          );
          resolve();
        }, 1000);
      });
   return (
      <div className='my-5 flex flex-row items-center justify-between gap-10'>
         <div className="flex-1 ">

            <div className='flex flex-row items-center justify-between'>
               <p><b>Location List</b></p>
               <Button onClick={showDrawer} icon={<PlusOutlined />} type="primary"> New Office Location</Button>
            </div>
            <Divider />

            <div>
               <Tree loadData={onLoadData} treeData={treeData} />
            </div>

            <Drawer
               title="Create a new Department"
               width={360}
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
                     <Col span={24}>
                        <Form.Item
                           name="name"
                           label="Name"
                           rules={[
                              {
                                 required: true,
                                 message: 'Please input your Company Name!',
                              },
                           ]}

                        >
                           <Input placeholder="Please enter Department name" />
                        </Form.Item>
                     </Col>

                  </Row>
                  <Row gutter={16}>
                     <Col span={24}>
                        <Form.Item
                           name="group"
                           label="Group"
                           rules={[
                              {
                                 required: true,
                                 message: 'Please input your group name!',
                              },
                           ]}

                        >
                           <Input placeholder="Please enter group name" />
                        </Form.Item>
                     </Col>

                  </Row>

                  <Row gutter={16}>
                     <Col span={8}>
                        <Form.Item

                        >
                           <Button onClick={onClose}>Cancel</Button>


                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item>

                           <Button htmlType="submit" type="primary">
                              Submit
                           </Button>

                        </Form.Item>
                     </Col>
                  </Row>
               </Form>
            </Drawer>
         </div>
         <div className="flex-1 ">

            <div>
               <p><b>Location Details</b></p>

            </div>
            <Divider />


         </div>
      </div>
   );
};

export default OfficeLocation;