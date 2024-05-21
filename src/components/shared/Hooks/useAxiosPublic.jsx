import axios from "axios";
const axiosPublic = axios.create({
   baseURL: 'https://lifestyleerpapi.up.railway.app',
   
 });

const AxiosPublic = () => {
   return axiosPublic
};

export default AxiosPublic;