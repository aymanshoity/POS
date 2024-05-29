"use server"






export const GetToken = () => {
   

   const token = JSON.parse(localStorage.getItem('user-storage'))
   console.log(token)
   const config = {
      headers: {
         Authorization: `Token ${token}`
      }
   }
   return config;
}