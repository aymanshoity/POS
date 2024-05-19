"use client"
import dynamic from "next/dynamic";
import { Descriptions, Tag, TreeSelect } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Space, Table, Input, Col, Drawer, Form, Row, Select, Checkbox, Divider } from 'antd';
import { useState, useRef, useMemo } from 'react';
import 'react-quill/dist/quill.snow.css';
import Highlighter from 'react-highlight-words';
const { Option } = Select;
const data = [
   {
     key: '1',
     name: 'Mike',
     company:"LifeStyle ERP ",
     type:"Main Office",
     department:"IT",
     location:"Dhaka",
     contact:"01973507152"
   },
   
 ];
const items = [
   {
      key: 1,
      label: 'Office Name',
      children: '',
      span: {
         xl: 4,
         
       },
   },
   {
      key: 2,
      label: 'Company',
      children: '',
      span: {
         xl: 2,
         
       },
   },
   {
      key: 3,
      label: 'Type',
      children: '',
      span: {
         xl: 2,
         
       },
   },
   {
      key: 4,
      label: 'Departments',
      children: '',
      span: {
         xl: 4,
         
       },
   },
   {
      key: 5,
      label: 'Location',
      children: '',
      span: {
         xl: 4,
         
       },
   },
   {
      key: 6,
      label: 'Address',
      span: {
         xl: 3,
         
       },
      children: '',
   },

]

const Office = () => {
   const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
   const [form] = Form.useForm();
   const [value, setValue] = useState('');
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
   const options = [];
   for (let i = 10; i < 36; i++) {
      options.push({
         label: i.toString(36) + i,
         value: i.toString(36) + i,
      });
   }
   const handleChange = (value) => {
      console.log(`selected ${value}`);
   };
   const [searchText, setSearchText] = useState('');
   const [searchedColumn, setSearchedColumn] = useState('');
   const searchInput = useRef(null);
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
               <Button
                  type="link"
                  size="small"
                  onClick={() => {
                     close();
                  }}
               >
                  close
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
         
         ...getColumnSearchProps('companyName'),
      },
      {
         title: 'Company',
         dataIndex: 'company',
         key: 'company',
         ...getColumnSearchProps('company'),
      },
      {
         title: 'Type',
         dataIndex: 'type',
         key: 'type',
         ...getColumnSearchProps('type'),
      },
      {
         title: 'Departments',
         dataIndex: 'departments',
         key: 'departments',
         
          
            
         
      },
      {
         title: 'Location',
         dataIndex: 'location',
         key: 'location',
         ...getColumnSearchProps('location'),
      },{
         title: 'Contact',
         dataIndex: 'contact',
         key: 'contact',
         ...getColumnSearchProps('contact'),
      },
      {
         title: 'Action',
         dataIndex: '',
         key: 'x',
         render: () => <a onClick={handleShowDetails}>View Details</a>,
      },

   ];
   return (
      <div>
         <div className="flex md:justify-end my-5">
            <Button onClick={showDrawer} icon={<PlusOutlined />} type="primary"> New Office</Button>
            <Drawer
               title="Create a new Office"
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
                     <Col span={24}>
                        <Form.Item
                           name="parentOffice"
                           label="Parent Office"

                        >
                           <TreeSelect
                              treeData={[
                                 {
                                    title: 'Main Office',
                                    value: 'mainOffice',
                                    children: [
                                       {
                                          title: 'Warehouse',
                                          value: 'warehouse',
                                       },
                                       {
                                          title: 'Banani',
                                          value: 'banani',
                                       },
                                    ],
                                 },
                              ]}
                           />
                        </Form.Item>
                     </Col>

                  </Row>
                  <Row gutter={16}>
                     <Col span={12}>
                        <Form.Item
                           name="name"
                           label="Name"
                           rules={[
                              {
                                 required: true,
                                 message: 'Please enter user name',
                              },
                           ]}

                        >
                           <Input placeholder="Please enter user name" />
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item
                           name="phone"
                           label="Phone Number"

                        >
                           <Input placeholder="Please enter phone number" />
                        </Form.Item>
                     </Col>

                  </Row>
                  <Row gutter={16}>
                     <Col span={12}>
                        <Form.Item
                           name="company"
                           label="Company"
                           rules={[
                              {
                                 required: true,
                                 message: 'Please enter Company Name',
                              },
                           ]}

                        >
                           <Select placeholder="Please choose the Company Name">
                              <Option value="LifeStyle ERP">LifeStyle ERP</Option>


                           </Select>
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item
                           name="type"
                           label="Type"
                           rules={[
                              {
                                 required: true,
                                 message: 'Please enter office type',
                              },
                           ]}

                        >
                           <Select placeholder="Please choose the type">
                              <Option value="Main Office">Main Office</Option>
                              <Option value="Branch Office">Branch Office</Option>

                           </Select>
                        </Form.Item>
                     </Col>
                  </Row>

                  <Row gutter={16}>
                     <Col span={24}>
                        <Form.Item
                           name="officeLocation"
                           label="Office Location"
                           rules={[
                              {
                                 required: true,
                                 message: 'Please enter office Location',
                              },
                           ]}

                        >
                           <TreeSelect
                              treeData={[
                                 {
                                    title: 'Bangladesh',
                                    value: 'bangladesh',
                                    children: [
                                       {
                                          title: 'Dhaka',
                                          value: 'dhaka',
                                       },

                                    ],
                                 },
                              ]}
                           />
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
                     <Col span={24}>
                        <Form.Item
                           name="department"
                           label="Department"

                        >
                           <Select
                              mode="multiple"
                              placeholder="Department"
                              style={{
                                 flex: 1,
                              }}
                              options={[
                                 {
                                    value: 'factory',
                                    label: 'Factory',
                                 },
                                 {
                                    value: 'IT',
                                    label: 'IT',
                                 },
                                 {
                                    value: 'accounts',
                                    label: 'Accounts',
                                 },
                                 {
                                    value: 'sales',
                                    label: 'Sales',
                                 },
                              ]}
                           />
                        </Form.Item>
                     </Col>

                  </Row>


                  <Row gutter={16}>
                     <Col span={8}>
                        <Form.Item
                           name="isOutlet"
                           valuePropName="checked"

                        >
                           <Checkbox>is Outlet!</Checkbox>
                        </Form.Item>
                     </Col>
                     <Col span={8}>
                        <Form.Item
                           name="isOffice"
                           valuePropName="checked"

                        >
                           <Checkbox>is Office!</Checkbox>
                        </Form.Item>
                     </Col>
                     <Col span={8}>
                        <Form.Item
                           name="isWarehouse"
                           valuePropName="checked"

                        >
                           <Checkbox>is Warehouse!</Checkbox>
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
         <div>
            <Table columns={columns} dataSource={data} />

         </div>
         <div>
            {/* Details */}
            <Drawer
               title="Office Details"
               width={620}
               onClose={onClose}
               open={showDetails}
               styles={{
                  body: {
                     paddingBottom: 80,
                  },

               }}

            >
               <Descriptions

                  bordered
                  column={{
                     xs: 1,
                     sm: 2,
                     md: 3,
                     lg: 3,
                     xl: 4,
                     xxl: 4,
                  }}
                  items={items}
               />

               <Divider />
               <Row gutter={16}>
                  <Col sm={2} md={4}>
                     <Form.Item

                     >
                        <Button danger>Delete</Button>


                     </Form.Item>
                  </Col>
                  <Col sm={4} md={4}>
                     <Form.Item>

                        <Button onClick={handleShowEdit} htmlType="submit" type="primary">
                           Edit
                        </Button>

                     </Form.Item>
                  </Col>
               </Row>
               <Divider />
               <h1>History</h1>
            </Drawer>
            {/* edit */}
            <Drawer
               title="Edit Company"
               width={500}
               onClose={CloseEdit}
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
                     <Col span={24}>
                        <Form.Item
                           name="parentOffice"
                           label="Parent Office"

                        >
                           <TreeSelect
                              treeData={[
                                 {
                                    title: 'Main Office',
                                    value: 'mainOffice',
                                    children: [
                                       {
                                          title: 'Warehouse',
                                          value: 'warehouse',
                                       },
                                       {
                                          title: 'Banani',
                                          value: 'banani',
                                       },
                                    ],
                                 },
                              ]}
                           />
                        </Form.Item>
                     </Col>

                  </Row>
                  <Row gutter={16}>
                     <Col span={12}>
                        <Form.Item
                           name="name"
                           label="Name"
                           rules={[
                              {
                                 required: true,
                                 message: 'Please enter user name',
                              },
                           ]}

                        >
                           <Input placeholder="Please enter user name" />
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item
                           name="phone"
                           label="Phone Number"

                        >
                           <Input placeholder="Please enter phone number" />
                        </Form.Item>
                     </Col>

                  </Row>
                  <Row gutter={16}>
                     <Col span={12}>
                        <Form.Item
                           name="company"
                           label="Company"
                           rules={[
                              {
                                 required: true,
                                 message: 'Please enter Company Name',
                              },
                           ]}

                        >
                           <Select placeholder="Please choose the Company Name">
                              <Option value="LifeStyle ERP">LifeStyle ERP</Option>


                           </Select>
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item
                           name="type"
                           label="Type"
                           rules={[
                              {
                                 required: true,
                                 message: 'Please enter office type',
                              },
                           ]}

                        >
                           <Select placeholder="Please choose the type">
                              <Option value="Main Office">Main Office</Option>
                              <Option value="Branch Office">Branch Office</Option>

                           </Select>
                        </Form.Item>
                     </Col>
                  </Row>

                  <Row gutter={16}>
                     <Col span={24}>
                        <Form.Item
                           name="officeLocation"
                           label="Office Location"
                           rules={[
                              {
                                 required: true,
                                 message: 'Please enter office Location',
                              },
                           ]}

                        >
                           <TreeSelect
                              treeData={[
                                 {
                                    title: 'Bangladesh',
                                    value: 'bangladesh',
                                    children: [
                                       {
                                          title: 'Dhaka',
                                          value: 'dhaka',
                                       },

                                    ],
                                 },
                              ]}
                           />
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
                     <Col span={24}>
                        <Form.Item
                           name="department"
                           label="Department"

                        >
                           <Select
                              mode="multiple"
                              placeholder="Department"
                              style={{
                                 flex: 1,
                              }}
                              options={[
                                 {
                                    value: 'factory',
                                    label: 'Factory',
                                 },
                                 {
                                    value: 'IT',
                                    label: 'IT',
                                 },
                                 {
                                    value: 'accounts',
                                    label: 'Accounts',
                                 },
                                 {
                                    value: 'sales',
                                    label: 'Sales',
                                 },
                              ]}
                           />
                        </Form.Item>
                     </Col>

                  </Row>


                  <Row gutter={16}>
                     <Col span={8}>
                        <Form.Item
                           name="isOutlet"
                           valuePropName="checked"

                        >
                           <Checkbox>is Outlet!</Checkbox>
                        </Form.Item>
                     </Col>
                     <Col span={8}>
                        <Form.Item
                           name="isOffice"
                           valuePropName="checked"

                        >
                           <Checkbox>is Office!</Checkbox>
                        </Form.Item>
                     </Col>
                     <Col span={8}>
                        <Form.Item
                           name="isWarehouse"
                           valuePropName="checked"

                        >
                           <Checkbox>is Warehouse!</Checkbox>
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
      </div>
   );
};

export default Office;