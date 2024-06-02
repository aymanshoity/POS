"use client"

import useAxiosPublic from "@/components/shared/Hooks/useAxiosPublic"
import { userStore } from "@/store/user"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

const getConfig = () => {
   const token = userStore(state => state.user.token)
 
   const config = {
     headers: {
       Authorization: `Token ${token}`,
     },
   };
 
   return config;
 };


export const useDataQuery = (ID) => {
   const axiosPublic = useAxiosPublic()
   const token = userStore(state => state.user.token)
   const [loading, setLoading] = useState(false)
   
   const fetchData = async () => {
      // console.log(token, ID)
      // console.log(!!token, !!ID)
      // console.log(!!!token, !!!ID)
      try {
         console.log(token, ID)
         setLoading(true)
         if (!!!token || !!!ID) {
            return console.log('absent id or token', token, ID)
         }
         console.log(ID)
         const res = await axiosPublic.get(`/api/order/invoices/?contact=${ID}`, {
            headers: {
               'Authorization': `Token ${token}`,
            }
         })
         console.log(res.data)

         return res.data
      } catch (e) {
         console.log(e)
      }
   }
   return useQuery({
      queryKey: ['customerInvoice'],
      queryFn: fetchData
   })

}