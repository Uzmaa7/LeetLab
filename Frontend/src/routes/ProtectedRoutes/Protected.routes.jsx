import {DashboardPage, QuestionPage } from "../../pages";
import { Route } from "react-router-dom";
import GuestOnlyWrapper from "../GuestOnlyWrapper.jsx";



export const ProtectedRoutes = (
    <>
       


        <Route path="user/dashboard" element={
            <GuestOnlyWrapper>
                <DashboardPage />
            </GuestOnlyWrapper>
        } />

        {/* Questions Listing Page */}
        <Route path="user/questions" element={
            <QuestionPage/>
        } />

       
    </>
)