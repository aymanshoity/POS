"use client"
import { Button } from 'antd';
import React, { useRef } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { userStore } from '@/store/user';
import { useQuery } from '@tanstack/react-query'
import ReactToPrint from 'react-to-print';
import { useDataQuery } from '@/utility/action ';
const CustomerHistory = ({ ID }) => {
   console.log(ID)
   let componentRef = useRef()
  
   // date fetching
   const {data: customerInvoice, refetch, isLoading } = useDataQuery(ID)
   console.log(customerInvoice)
   // useQuery({
   //    queryKey: ['customerInvoice'],
   //    enabled: !!token && !!ID,
   //    queryFn: async () => {
   //       try {
   //          const res = await axiosPublic.get(`/api/order/invoices/?contact=${ID}`, {
   //             headers: {
   //                'Authorization': `Token ${token}`,
   //             }
   //          })
   //          console.log(res.data)
   //          return res.data
   //       } catch (e) {
   //          console.log(e)
   //       }
   //    },


   // })
   

   if (isLoading) {
      return <div className="w-10 h-10 flex gap-2 items-center justify-center"><div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-8 border-dotted border-sky-600"></div></div>

   }

   const totalBill = customerInvoice?.reduce((total, invoice) => total + parseFloat(invoice?.bill),
      0).toFixed(2);
   const totalPayment = customerInvoice?.reduce((total, invoice) => total + parseFloat(invoice?.payment),
      0).toFixed(2);
   const totalDue = customerInvoice?.reduce((total, invoice) => total + parseFloat(invoice?.due),
      0).toFixed(2);
   console.log(totalBill, totalPayment, totalDue);
   return (
      <div>
         <ReactToPrint
            trigger={() => <Button type="primary">Print this Out</Button>}
            content={() => componentRef}
         />
         
         <div className="hidden">
            <div className='mx-10' ref={(el) => (componentRef = el)}>

               <div className=''>
                  <h1 className='text-center text-2xl font-bold my-10'>Contact History</h1>
                  {/* <div className='grid grid-cols-2 gap-5'>
                     <h1>Name:{customerInvoice[0]?.contact?.name}</h1>
                     <h1>Phone:{customerInvoice[0]?.contact?.phone}</h1>
                     <h1>Email:{customerInvoice[0]?.contact?.email}</h1>
                     <h1>Address:{customerInvoice[0]?.contact?.address}</h1>
                     <h1>Type:{customerInvoice[0]?.contact?.role}</h1>
                  </div> */}

               </div>
               <div >
                  {!isLoading && <table className='my-5 table-fixed  w-full border-collapse '>
                     <thead className=''>
                        <tr>
                           <th>Sl.</th>
                           <th>Date</th>
                           <th>Purchase No.</th>
                           <th>Total Qty</th>
                           <th>Total Price</th>
                           <th>Paid Amount</th>
                           <th>Due Amount</th>
                        </tr>
                     </thead>
                     <tbody className='text-center '>
                        {
                           customerInvoice?.map((invoice, index) => (
                              <tr key={index}>
                                 <td className='border border-collapse '>{index + 1}</td>
                                 <td className='border border-collapse '>{invoice?.issue_date}</td>
                                 <td className='border border-collapse overflow-hidden text-ellipsis whitespace-nowrap'>{invoice?.invoice_number}</td>
                                 <td className='border border-collapse'>{invoice?.quantity}</td>
                                 <td className='border border-collapse'>{invoice?.bill}</td>
                                 <td className='border border-collapse'>{invoice?.payment}</td>
                                 <td className='border border-collapse'>{invoice?.due}</td>
                              </tr>

                           ))


                        }

                     </tbody>
                     <tfoot className='font-bold'>

                        <tr >
                           <td colSpan={4} className='border border-collapse'>Total</td>

                           <td className='border border-collapse text-center'>{totalBill}</td>
                           <td className='border border-collapse text-center'> {totalPayment}</td>
                           <td className='border border-collapse text-center'> {totalDue}</td>

                        </tr>
                     </tfoot>
                  </table>}
               </div>
            </div>
         </div>
         <div>
            {!isLoading && <table className='my-5 table-fixed  w-full border-collapse '>
               <thead className=''>
                  <tr>
                     <th>Sl.</th>
                     <th>Date</th>
                     <th>Purchase No.</th>
                     <th>Total Qty</th>
                     <th>Total Price</th>
                     <th>Paid Amount</th>
                     <th>Due Amount</th>
                  </tr>
               </thead>
               <tbody className='text-center '>
                  {
                     customerInvoice?.map((invoice, index) => (
                        <tr key={index}>
                           <td className='border border-collapse '>{index + 1}</td>
                           <td className='border border-collapse '>{invoice?.issue_date}</td>
                           <td className='border border-collapse overflow-hidden text-ellipsis whitespace-nowrap'>{invoice?.invoice_number}</td>
                           <td className='border border-collapse'>{invoice?.quantity}</td>
                           <td className='border border-collapse'>{invoice?.bill}</td>
                           <td className='border border-collapse'>{invoice?.payment}</td>
                           <td className='border border-collapse'>{invoice?.due}</td>
                        </tr>

                     ))


                  }

               </tbody>
               <tfoot className='font-bold'>

                  <tr >
                     <td colSpan={4} className='border border-collapse'>Total</td>

                     <td className='border border-collapse text-center'>{totalBill}</td>
                     <td className='border border-collapse text-center'> {totalPayment}</td>
                     <td className='border border-collapse text-center'> {totalDue}</td>

                  </tr>
               </tfoot>
            </table>}
         </div>
      </div>
   );
};

export default CustomerHistory;