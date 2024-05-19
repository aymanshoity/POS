"use client"
import dynamic from "next/dynamic";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Space, DatePicker, Table, Row, Col, Form, Select, Drawer, Checkbox, Typography } from "antd";
import { space } from "postcss/lib/list";
import React, { useMemo, useRef, useState } from "react";
import Highlighter from 'react-highlight-words';
const { Option } = Select;
import 'react-quill/dist/quill.snow.css';
const data = [
   {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      email: 'johnbrown@gmail.com',
      type: 'regular'
   },
   {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      email: 'johnbrown@gmail.com',
      type: 'regular'
   },
   {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      email: 'johnbrown@gmail.com',
      type: 'regular'
   },
   {
      key: '4',
      name: 'Disabled User',
      age: 99,
      address: 'Sydney No. 1 Lake Park',
      email: 'johnbrown@gmail.com',
      type: 'regular'
   },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
   onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
   },

};
const Supplier = () => {
   const [form] = Form.useForm();
   const [value, setValue] = useState('');
   const [selectionType, setSelectionType] = useState('checkbox');
   const [searchText, setSearchText] = useState('');
   const [searchedColumn, setSearchedColumn] = useState('');
   const searchInput = useRef(null);
   const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
   const onFinish = (values) => {
      console.log('Success:', values);
      form.resetFields();
   };
   const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
   };
   const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
   };
   const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText('');
   };
   const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
         <div
            style={{
               padding: 8,
            }}
            onKeyDown={(e) => e.stopPropagation()}
         >
            <Input
               ref={searchInput}
               placeholder={`Search ${dataIndex}`}
               value={selectedKeys[0]}
               onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
               onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
               style={{
                  marginBottom: 8,
                  display: 'block',
               }}
            />
            <Space>
               <Button
                  type="primary"
                  onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                  icon={<SearchOutlined />}
                  size="small"
                  style={{
                     width: 90,
                  }}
               >
                  Search
               </Button>
               <Button
                  onClick={() => clearFilters && handleReset(clearFilters)}
                  size="small"
                  style={{
                     width: 90,
                  }}
               >
                  Reset
               </Button>
               <Button
                  type="link"
                  size="small"
                  onClick={() => {
                     confirm({
                        closeDropdown: false,
                     });
                     setSearchText(selectedKeys[0]);
                     setSearchedColumn(dataIndex);
                  }}
               >
                  Filter
               </Button>

            </Space>
         </div>
      ),
      filterIcon: (filtered) => (
         <SearchOutlined
            style={{
               color: filtered ? '#1677ff' : undefined,
            }}
         />
      ),
      onFilter: (value, record) =>
         record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
         if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
         }
      },
      render: (text) =>
         searchedColumn === dataIndex ? (
            <Highlighter
               highlightStyle={{
                  backgroundColor: '#ffc069',
                  padding: 0,
               }}
               searchWords={[searchText]}
               autoEscape
               textToHighlight={text ? text.toString() : ''}
            />
         ) : (
            text
         ),
   });
   const columns = [
      {
         title: 'Name',
         dataIndex: 'name',
         key: 'name',
         width: '20%',
         ...getColumnSearchProps('name'),
      },
      {
         title: 'Age',
         dataIndex: 'age',
         key: 'age',
         width: '5%',
         ...getColumnSearchProps('age'),
      },
      {
         title: 'Address',
         dataIndex: 'address',
         key: 'address',
         ...getColumnSearchProps('address'),
         sorter: (a, b) => a.address.length - b.address.length,
         sortDirections: ['descend', 'ascend'],
      },
      {
         title: 'Email',
         dataIndex: 'email',
         key: 'email',
         width: '25%',
         ...getColumnSearchProps('email'),
      },
      {
         title: 'Type',
         dataIndex: 'type',
         key: 'type',
         width: '20%',
         ...getColumnSearchProps('type'),
      },
      {
         title: 'Action',
         dataIndex: '',
         key: 'x',
         render: () => (

            <Space className="flex   items-start">
               <Typography><a onClick={handleShowEdit}>Edit</a></Typography>
               <Typography><a onClick={handleShowHistory}>History</a></Typography>
            </Space>

         )
      },
   ];

   const MobileColumns = [
      {
         title: 'Details',
         dataIndex: 'details',
         width:'55%',
         key: 'details',
         render: (_, record) => (
            <div className="">
               <div className='flex '>
                  <div className='flex-1 w-2/5'><strong>Name</strong></div>
                  <div className='flex-1 w-1/2'>{record.name}</div>
               </div>


               <div className='flex '>
                  <div className='flex-1 w-1/2'><strong>Age</strong></div>
                  <div className='flex-1 w-1/2'>{record.age}</div>
               </div>


               <div className='flex '>
                  <div className='flex-1 w-1/2'><strong>Address</strong></div>
                  <div className='flex-1 w-1/2'> {record.address}</div>
               </div>

               <div className='flex '>
                  <div className='flex-1 w-1/2 '><strong>Email</strong></div>
                  <div className='flex-1 w-1/2 '><p className=" break-words">{record.email}</p></div>
               </div>

               <div className='flex '>
                  <div className='flex-1 w-1/2' ><strong>Type</strong></div>
                  <div className='flex-1  w-1/2'>{record.type}</div>
               </div>
            </div>
         ),
      },
      {
         title: 'Action',
         dataIndex: 'action',
         width:'45%',
         key: 'action',
         render: () => (
            <Space className="flex flex-col  items-start">
               <Typography.Link><a onClick={handleShowEdit}>Edit</a></Typography.Link>
               <Typography.Link><a onClick={handleShowHistory}>History</a></Typography.Link>
            </Space>
         ),
      },
   ];

   // drawer
   const [open, setOpen] = useState(false);
   const [showEdit, setShowEdit] = useState(false);
   const [showHistory, setShowHistory] = useState(false);
   const showDrawer = () => {
      setOpen(true);
   };
   const onClose = () => {
      setOpen(false);
      setShowEdit(false)
      setShowHistory(false)
   };
   const handleShowEdit = () => {
      setShowEdit(true);
   };
   const handleShowHistory = () => {
      setShowHistory(true);
   };


   return (
      <div className=" mt-10 ">
         <div className="flex md:justify-end mb-5">
            <Button onClick={showDrawer} icon={<PlusOutlined />} type="primary"> New Supplier</Button>
            <Drawer
               title="Create a new Supplier"
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
                           name="type"
                           label="Type"

                        >
                           <Select placeholder="Please choose the type">
                              <Option value="VIPCustomer">VIP Customer</Option>
                              <Option value="RegularCustomer">Regular Customer</Option>
                              <Option value="ForeignCustomer">Foreign Customer</Option>
                              <Option value="OnlineCustomer">Online Customer</Option>

                           </Select>
                        </Form.Item>
                     </Col>
                  </Row>
                  <Row gutter={16}>
                     <Col span={12}>
                        <Form.Item
                           name="special_date_type"
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
                           name="special_date"
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
                        >
                           <ReactQuill value={value} onChange={setValue} />
                        </Form.Item>

                     </Col>
                  </Row>
                  <Row gutter={16}>
                     <Col span={16}>
                        <Form.Item
                           name="active_contact"
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

         <Button type="primary">Download Selected Data</Button>


         {/*  */}

         <div className="mt-5">
            <Table
               rowSelection={{
                  type: selectionType,
                  ...rowSelection,
               }}
               className="hidden sm:table mt-5"
               columns={columns}
               dataSource={data}
            />

            <Table  className=" md:hidden  lg:hidden " dataSource={data} columns={MobileColumns} rowKey="key" />;
            
         </div>
         <div>
            {/* Edit */}
            <Drawer
               title="Edit a Supplier"
               width={720}
               onClose={onClose}
               open={showEdit}
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
                           name="type"
                           label="Type"

                        >
                           <Select placeholder="Please choose the type">
                              <Option value="VIPCustomer">VIP Customer</Option>
                              <Option value="RegularCustomer">Regular Customer</Option>
                              <Option value="ForeignCustomer">Foreign Customer</Option>
                              <Option value="OnlineCustomer">Online Customer</Option>

                           </Select>
                        </Form.Item>
                     </Col>
                  </Row>
                  <Row gutter={16}>
                     <Col span={12}>
                        <Form.Item
                           name="special_date_type"
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
                           name="special_date"
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
                        >
                           <ReactQuill value={value} onChange={setValue} />
                        </Form.Item>

                     </Col>
                  </Row>
                  <Row gutter={16}>
                     <Col span={16}>
                        <Form.Item
                           name="active_contact"
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
            {/* History */}
            <Drawer
               title=" Supplier History"
               width={720}
               onClose={onClose}
               open={showHistory}
               styles={{
                  body: {
                     paddingBottom: 80,
                  },

               }}

            >
               {/* <Form
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
                           name="type"
                           label="Type"

                        >
                           <Select placeholder="Please choose the type">
                              <Option value="VIPCustomer">VIP Customer</Option>
                              <Option value="RegularCustomer">Regular Customer</Option>
                              <Option value="ForeignCustomer">Foreign Customer</Option>
                              <Option value="OnlineCustomer">Online Customer</Option>

                           </Select>
                        </Form.Item>
                     </Col>
                  </Row>
                  <Row gutter={16}>
                     <Col span={12}>
                        <Form.Item
                           name="special_date_type"
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
                           name="special_date"
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
                        >
                           <ReactQuill value={value} onChange={setValue} />
                        </Form.Item>

                     </Col>
                  </Row>
                  <Row gutter={16}>
                     <Col span={16}>
                        <Form.Item
                           name="active_contact"
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
               </Form> */}
            </Drawer>
         </div>


      </div>
   );
};

export default Supplier;