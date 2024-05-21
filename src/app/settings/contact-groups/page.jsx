"use client"
import { DeleteFilled, MinusCircleFilled, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Popconfirm } from 'antd';
import React from 'react';

const ContactGroups = () => {

   const confirmCustomer = (e) => {
      console.log(e);
      message.success('Click on Yes');
    };
    const cancelCustomer = (e) => {
      console.log(e);
      message.error('Click on No');
    };
   const confirmSupplier = (e) => {
      console.log(e);
      message.success('Click on Yes');
    };
    const cancelSupplier = (e) => {
      console.log(e);
      message.error('Click on No');
    };

   
   return (
      <div className='my-5 flex lg:flex-row flex-col  items-center justify-evenly '>
         <div className=" ">

            <div className='w-[500px]   '>
               <p className='text-left'><b>Customer Groups</b></p>
               <Divider />
               <div className='mb-5 flex flex-row items-center gap-5'>
                  <Input className='border' placeholder='Please enter a new group name' />
                  <Button type="primary">Add</Button>
               </div>
               <div>
                  <div className='flex flex-row items-center justify-between gap-10'>
                     <div>-VIP Customer </div>
                     <div><span className='mr-4'>Edit</span>

                        <Popconfirm
                           title="Delete the task"
                           description="Are you sure to delete this task?"
                           onConfirm={confirmCustomer}
                           onCancel={cancelCustomer}
                           okText="Yes"
                           cancelText="No"
                        >
                           <Button  icon={<MinusCircleFilled />} type="primary" danger></Button>
                        </Popconfirm>
                        </div>
                  </div>
                  <Divider />
               </div>



            </div>





         </div>
         <div className="  ">

            <div className='w-[500px]   '>
               <p className='lg:text-right'><b>Supplier Groups</b></p>
               <Divider />
               <div className='mb-5 flex flex-row items-center gap-5'>
                  <Input className='border' placeholder='Please enter a new group name' />
                  <Button type="primary">Add</Button>
               </div>
               <div>
                  <div className='flex flex-row items-center justify-between gap-10'>
                     <div>- Regular Supplier</div>
                     <div><span className='mr-4'>Edit</span><Popconfirm
                           title="Delete the task"
                           description="Are you sure to delete this task?"
                           onConfirm={confirmSupplier}
                           onCancel={cancelSupplier}
                           okText="Yes"
                           cancelText="No"
                        >
                           <Button  icon={<MinusCircleFilled />} type="primary" danger></Button>
                        </Popconfirm></div>
                  </div>
                  <Divider />
               </div>



            </div>





         </div>
      </div>
   );
};

export default ContactGroups;