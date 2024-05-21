


import AxiosPublic from "@/components/shared/Hooks/useAxiosPublic";
import { userStore } from "@/store/user";
import { useRouter } from "next/navigation";


export const SignIn = async (user) => {

    const axiosPublic = AxiosPublic()
    const updateUser = userStore(state => state.updateUser)
    const router = useRouter()
    console.log(user)
    const userResponse = await axiosPublic.post('/api/contact/login/', user);
    console.log(userResponse);
    console.log(userResponse.data);

    if (userResponse.status === 200) {
        updateUser(userResponse.data);
        return router.push('/');
    } else {
        alert('Wrong credentials');
    }

}


