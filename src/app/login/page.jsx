"use client"
import { Button, Checkbox, Form, Image, Input } from 'antd';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { userStore } from '@/store/user';
import AxiosPublic from '@/components/shared/Hooks/useAxiosPublic';

const Login = () => {

    const [loading, setLoading] = useState(false)
    const updateUser = userStore(state => state.updateUser)
    
    const router = useRouter()
    const axiosPublic = AxiosPublic()
    const onFinish =async(values) => {
        console.log('Success:', values);
        // SignIn(values)
        const userResponse = await axiosPublic.post('/api/contact/login/', values)
        console.log(userResponse)
        console.log(userResponse.data)
        if (userResponse.status === 200) {
            updateUser(userResponse.data);
            router.push('/');
        }
        else {
            alert('wrong Credential')
        }


    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (

        <div className='bg-base-200 my-40 cfd'>

            <div className=" "><Image className="" src="https://i.ibb.co/bBKQzcD/anzaraltd.png" width={200}
                height={100} alt="logo" /></div>
            <div className=''>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>



                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>

    );
};

export default Login;