"use client"

import { userStore } from "@/store/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PrivateRoute = ({ children }) => {
   const is_authenticated = userStore(state => state.user.is_authenticated)
   const router = useRouter()
   const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (is_authenticated) {
      setIsLoading(false);
    } else {
      router.replace("/login");
    }
  }, [is_authenticated, router]);

  if (isLoading) {
     <div><h1>Loading...</h1></div>; // Render a loading state while checking authentication
  }

  return children;
};



export default PrivateRoute;