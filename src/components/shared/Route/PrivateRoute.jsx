import { userStore } from '@/store/user';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const PrivateRoute = ({ children }) => {
   const user = userStore(state => state.user)
   const [loading, setLoading] = useState(true);
   const router = useRouter()

   // if (loading) {
   //    return <div className='flex flex-col items-center justify-center'>
   //       <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-8 border-dotted border-sky-600"></div>
   //    </div>
   // }

   if(user){
      setLoading(false)
      return children;
   }

   return router.push('/login')






};

export default PrivateRoute;