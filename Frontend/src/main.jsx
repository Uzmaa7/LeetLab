import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {  RouterProvider} from "react-router-dom"
import './index.css'
import {router} from "./routes/index.routes" 
import { UserContextProvider } from './contexts/UserContext.jsx'
import { ChatProvider } from './contexts/ChatContext.jsx'



createRoot(document.getElementById('root')).render(

  <StrictMode>
    
    <UserContextProvider>

      <ChatProvider>

        <RouterProvider router={router}/>

      </ChatProvider>
      
    </UserContextProvider>
    
  </StrictMode>
)
