"use server"

import axios from "axios";
const axiosPublic = axios.create({
   baseURL: 'https://lifestyleerpapi.up.railway.app',
   
 });



export async function SignIn (user) {
    console.log(user)
  
    const userResponse = await axiosPublic.post('/api/contact/login/', user);
    console.log(userResponse.status);
    // console.log(userResponse.data);

    if (userResponse?.status === 200) {
        
        return userResponse.data
    } else {
        alert('Wrong credentials');
    }

}


