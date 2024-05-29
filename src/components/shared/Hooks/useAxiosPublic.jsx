import axios from "axios";
const axiosPublic = axios.create({
   baseURL: 'https://lifestyleerpapi.up.railway.app',
   
 });

const useAxiosPublic = () => {
   return axiosPublic
};

export default useAxiosPublic;