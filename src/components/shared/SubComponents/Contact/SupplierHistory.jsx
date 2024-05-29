"use client"
import { Button, Col, Divider, Drawer, Popconfirm, message, Row } from "antd";
import { useRef, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import ReactToPrint from 'react-to-print';

const SupplierHistory = ({ token, ID, refetch }) => {
   // console.log(token ,detailsId)
   let componentRef = useRef()
   const axiosPublic = useAxiosPublic()
   const [open, setOpen] = useState(false);
   const [showDetails, setShowDetails] = useState(false);
   const [contact, setContact] = useState([]);
   const onClose = () => {
      setOpen(false);
      setShowDetails(false)
   };
   const handleShowDetails = async (id) => {
      console.log(id)
      setShowDetails(true);
      try {
         const res = await axiosPublic.get(`/api/contact/contact/${id}/`, {
            headers: {
               'Authorization': `Token ${token}`,
            }
         })
         console.log(res.data)
         setContact(res.data)


      } catch (e) {
         console.log(e)
      }
      refetch()

   }
   const confirm = async (e) => {
      console.log(e);
      try {
         const res = await axiosPublic.delete(`/api/contact/contact/${e}/`, {
            headers: {
               'Authorization': `Token ${token}`,
            }
         })
         if (res.status === 204) {
            message.success('Contact Deleted');
            refetch()
         }


      } catch (e) {
         console.log(e)
      }


   };
   const cancel = (e) => {
      console.log(e);
      message.error('Click on No');
   };

   return (
      <div>
         <a onClick={() => handleShowDetails(ID)}>History</a>
         <Drawer
            title="Supplier Information"
            width={1000}
            onClose={onClose}
            open={showDetails}
            styles={{
               body: {
                  paddingBottom: 80,
               },
            }}

         >
            <Row className="my-5" gutter={16}>
               <Col className="flex gap-5" span={12}>
                  <Popconfirm
                     title="Delete the task"
                     description="Are you sure to delete the contact?"
                     onConfirm={() => confirm(contact?.id)}
                     onCancel={cancel}
                     okText="Yes"
                     cancelText="No"

                  >
                     <Button danger>Delete</Button>
                  </Popconfirm>
                  <ReactToPrint
                     trigger={() => <Button type="primary">Print this Out</Button>}
                     content={() => componentRef}
                  />
               </Col>


            </Row>
            <Divider />

            <div ref={(el) => (componentRef = el)}>
               <Row className="my-5" gutter={16}>
                  <Col span={12}>

                     <p>Name: {contact?.name}</p>
                  </Col>
                  <Col span={12}>
                     <p>Phone: {contact?.phone}</p>
                  </Col>

               </Row>
               <Row className="my-5" gutter={16}>
                  <Col span={12}>
                     <p>Email:  {contact?.email}</p>
                  </Col>
                  <Col span={12}>
                     <p>Type: {contact?.role}</p>
                  </Col>

               </Row>
               <Row className="my-5" gutter={16}>
                  <Col span={24}>
                     <p>Address: {contact?.address}</p>
                  </Col>


               </Row>
               <Row className="my-5" gutter={16}>
                  <Col span={24}>
                     <p>Remark: {contact?.remarks}</p>
                  </Col>


               </Row>

               <Row className="my-5" gutter={16}>
                  <Col span={24}>
                     <h1 className="text-lg font-bold">Account Balance:0 BDT </h1>
                     
                  </Col>
               
               </Row>
               <Row className="my-5" gutter={16}>
                     <Col span={24}>
                     <p className="font-bold my-3">Transaction History</p>
                        <table className='my-5 table-fixed   w-full border border-collapse '>
                           <thead className=''>
                              <tr>
                                 
                                 <th className='border  '>Date</th>
                                 <th className='border  '>Head</th>
                                 <th className='border  '>Details</th>
                                 <th className='border  '>Amount</th>
                              </tr>
                           </thead>
                           <tbody>

                           </tbody>
                        </table>
                     </Col>


                  </Row>
                  <Divider style={{ weight: '5px' }}/>
                  <Row className="my-5" gutter={16}>
                     <Col span={24}>
                     <p className="font-bold my-3">Balance History</p>
                        <table className='my-5 table-fixed   w-full border border-collapse '>
                           <thead className=''>
                              <tr>
                                 
                                 <th className='border  '>Date</th>
                                 <th className='border  '>Head</th>
                                 <th className='border  '>Details</th>
                                 <th className='border  '>Amount</th>
                                 <th className='border  '>Balance</th>
                              </tr>
                           </thead>
                           <tbody>

                           </tbody>
                        </table>
                     </Col>


                  </Row>
            </div>

         </Drawer>

      </div>


   );
};

export default SupplierHistory;