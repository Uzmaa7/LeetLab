import axios from "axios";
import { api } from "./api.services";




export const loginService = async (data) => {
    console.log(data);
    const response = await  api.post("/auth/login", data)
    console.log(response.data);

    return response.data;
    // .then(res => res.data.user)
    
};
    


export const registerService = (data) =>
    api.post("/users/register", data).then(res => res.data);


// // export const refreshTokenService = () =>
// //     api.post("/users/refresh-token").then(res => res.data.data);
// export const refreshTokenService = async () => {
//     // Get the backup token from LocalStorage
//     const fallbackToken = localStorage.getItem("refreshToken");

//     // Send it in the body. If cookies work, backend uses cookies. 
//     // If cookies fail (Mobile), backend uses this body token.
//     return api.post("/users/refresh-token", { 
//         refreshToken: fallbackToken 
//     }).then(res => res.data.data);
// };


export const logoutService = async () =>
    await api.post("/users/logout");

