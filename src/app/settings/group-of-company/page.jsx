"use client"

import { PlusOutlined,SearchOutlined } from '@ant-design/icons';
import { Button,Space, Table, Input,Option, Col, Drawer, Form, Row, Select, DatePicker, Checkbox } from 'antd';
import  { useState,useRef } from 'react';
import Highlighter from 'react-highlight-words';
const data = [
  {
    key: '1',
    group: 'Zeher',
   
    
  }
];
const GroupOfCompany = () => {
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
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
        setShowDetails(false)
    };

    const handleShowDetails=()=>{
        setShowDetails(true)
    }
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
        width: '50%',
        ...getColumnSearchProps('name'),
      },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        width: '50%',
        render: () => <a onClick={handleShowDetails}>View Details</a>,
    },
      
    ];
   return (
      <div>
         <div className="flex md:justify-end my-5">
                <Button onClick={showDrawer} icon={<PlusOutlined />} type="primary"> New Department</Button>
                <Drawer
                    title="Create a new Customer"
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
                                    className="rounded-xl"
                                >
                                    {/* <ReactQuill  theme="snow" value={value} onChange={setValue} /> */}
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
            <div>
            <Table columns={columns} dataSource={data} />
            <Drawer
                    title="Create a new Customer"
                    width={720}
                    onClose={onClose}
                    open={showDetails}
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
                                    className="rounded-xl"
                                >
                                    {/* <ReactQuill  theme="snow" value={value} onChange={setValue} /> */}
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
      </div>
   );
};

export default GroupOfCompany;