import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "../layout/Layout.jsx"
import { PublicRoutes } from "./PublicRoutes/Public.routes";
import { ProtectedRoutes } from "./ProtectedRoutes/Protected.routes";
import AdminRoute from "./ProtectedRoutes/Admin.routes.jsx";
import CreateProblemPage from "../pages/CreateProblemPage.jsx";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>

            {PublicRoutes}
            
            {ProtectedRoutes}

            {/* Admin Only Protected Routes */}
            <Route path="/admin" element={<AdminRoute />}>
                <Route path="create-problem" element={<CreateProblemPage />} />
            </Route>


        </Route>
    )
)