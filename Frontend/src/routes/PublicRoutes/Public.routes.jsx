import { LoginPage, SignupPage, LandingPage } from "../../pages";
import { Route } from "react-router-dom";
import GuestOnlyWrapper from "../GuestOnlyWrapper.jsx";


export const PublicRoutes = (
    <>
        <Route index element={<LandingPage />} />


        <Route path="user/signup" element={
            <GuestOnlyWrapper>
                <SignupPage />
            </GuestOnlyWrapper>
        } />



        <Route path="user/login" element = { 
            <GuestOnlyWrapper>
                <LoginPage/>
            </GuestOnlyWrapper>
         }/>

         

        

    </>
)
