"use client"

import { useQuery } from "@tanstack/react-query";
import { Button, Col, Divider, Drawer, Popconfirm,message, Row } from "antd";
import { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import EditContact from "./EditContact";
import CustomerHistory from "./CustomerHistory";

const ContactDetails = ({ token, detailsId,refetch }) => {
   // console.log(token ,detailsId)
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
         <a  onClick={() => handleShowDetails(detailsId)}>View Details</a>
         <Drawer
            title="Customer Information"
            width={720}
            onClose={onClose}
            open={showDetails}
            styles={{
               body: {
                  paddingBottom: 80,
               },
            }}

         >

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
                  <EditContact ID={contact?.id}></EditContact>
               </Col>


            </Row>
            <Divider />
            <Row className="my-5" gutter={16}>
               <Col span={24}>
                  <h1>Advanced from Customer: </h1>
                  <p className="font-bold my-3"> History</p>
               </Col>
               <Row className="my-5" gutter={16}>
                  <Col span={24}>
                     <CustomerHistory ID={contact?.id}></CustomerHistory>
                  </Col>


               </Row>


            </Row>

         </Drawer>

      </div>


   );
};

export default ContactDetails;