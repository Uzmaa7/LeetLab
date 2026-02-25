import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {  RouterProvider} from "react-router-dom"
import './index.css'
import {router} from "./routes/index.routes" 
import { UserContextProvider } from './contexts/UserContext.jsx'



createRoot(document.getElementById('root')).render(

  <StrictMode>
    
    <UserContextProvider>
        <RouterProvider router={router}/>
    </UserContextProvider>
    
  </StrictMode>
)
