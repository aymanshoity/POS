"use client"
import { DeleteFilled, MinusCircleFilled, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Popconfirm } from 'antd';
import React from 'react';

const AccountGroups = () => {

   const confirmBank = (e) => {
      console.log(e);
      message.success('Click on Yes');
    };
    const cancelBank = (e) => {
      console.log(e);
      message.error('Click on No');
    };
   const confirmMobileBanking = (e) => {
      console.log(e);
      message.success('Click on Yes');
    };
    const cancelMobileBanking = (e) => {
      console.log(e);
      message.error('Click on No');
    };

   
   return (
      <div className='my-5 flex lg:flex-row flex-col  items-center justify-evenly '>
         <div className=" ">

            <div className='w-[500px]   '>
               <p className='text-left'><b>Bank</b></p>
               <Divider />
               <div className='mb-5 flex flex-row items-center gap-5'>
                  <Input className='border' placeholder='Please enter a new bank name' />
                  <Button type="primary">Add</Button>
               </div>
               <div>
                  <div className='flex flex-row items-center justify-between gap-10'>
                     <div>- City Bank </div>
                     <div><span className='mr-4'>Edit</span>

                        <Popconfirm
                           title="Delete the bank"
                           description="Are you sure to delete this bank?"
                           onConfirm={confirmBank}
                           onCancel={cancelBank}
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
               <p className='lg:text-right'><b>Mobile Banking</b></p>
               <Divider />
               <div className='mb-5 flex flex-row items-center gap-5'>
                  <Input className='border' placeholder='Please enter a new group name' />
                  <Button type="primary">Add</Button>
               </div>
               <div>
                  <div className='flex flex-row items-center justify-between gap-10'>
                     <div>- BKASH-M-39</div>
                     <div><span className='mr-4'>Edit</span><Popconfirm
                           title="Delete the mBank"
                           description="Are you sure to delete this mbank?"
                           onConfirm={confirmMobileBanking}
                           onCancel={cancelMobileBanking}
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

export default AccountGroups;