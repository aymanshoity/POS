"use client"
import { Descriptions } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Space, Table, Input, Option, Col, Drawer, Form, Row, Select, DatePicker, Checkbox, Divider } from 'antd';
import { useState, useRef } from 'react';
import Highlighter from 'react-highlight-words';
const data = [
    {
        key: '1',
        group: 'Zeher',


    }
];
const items = [
    {
        label: 'Group',
        children: 'Zeher',
    },
    ]

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
            title: 'Group',
            dataIndex: 'group',
            key: '1',
            width: '50%',
            ...getColumnSearchProps('group'),
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

                                >
                                    <Input placeholder="Please enter user name" />
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
            <div>
                <Table columns={columns} dataSource={data} />

            </div>
            <div>
                {/* Details */}
                <Drawer
                    title="Group Details"
                    width={500}
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
                </Drawer>
                {/* edit */}
                <Drawer
                    title="Edit Department"
                    width={360}
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
                                    name="name"
                                    label="Name"

                                >
                                    <Input placeholder="Please enter user name" />
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
        </div>
    );
};

export default GroupOfCompany;