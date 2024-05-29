"use server"



import axios from "axios";


const axiosPublic = axios.create({
   baseURL: 'https://lifestyleerpapi.up.railway.app',
   
 });




export async function createContact (contact,token) {
    
    contact["data"] = "";
    console.log(contact,token)
    try{
        const contactResponse = await axiosPublic.post('/api/contact/contact/', {...contact},{
            headers: {
            'Authorization': `Token ${token}`,
            }
            });
        console.log(contactResponse);
        // console.log(contactResponse.data);
    
        if (contactResponse.status === 201) {
            
            return contactResponse.data
        } else {
            console.log('Wrong credentials',contactResponse.status);
        }
    }catch (e){
        console.log(e);
    }

}
export async function editContact (id,contact,token) {
    
    
    try{
        const editResponse = await axiosPublic.patch(`/api/contact/contact/${id}/`, contact,{
            headers: {
            'Authorization': `Token ${token}`,
            }
            });
        console.log(editResponse);
         console.log(editResponse.data);
    
        if (editResponse.status === 200) {
            
            return editResponse.data
        } else {
            console.log('Wrong credentials',editResponse.status);
        }
    }catch (e){
        console.log(e);
    }

}


