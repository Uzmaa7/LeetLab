import {create} from "zustand";
import { axiosInstance } from "../lib/axios";





export const useAuthStore = create((set)=>({
    authUser: null,
    isSigninUp:false,
    isLoggingIn:false,
    isCheckingAuth:false,

    checkAuth: async()=>{
        set({isCheckingAuth:true});

        try {
           const res = await axiosInstance.get("/auth/check") 
           console.log("checauth response", res.data);
           set({authUser: res.data.user});
        } catch (error) {
            console.log("Error checking auth",error);
            set({authUser:null});
        }
        finally{
            set({isCheckingAuth:false});
        }
    }
}))


