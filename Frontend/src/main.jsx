import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {  RouterProvider} from "react-router-dom"
import './index.css'
import {router} from "./routes/index.routes" 
import { UserContextProvider } from './contexts/UserContext.jsx'
import { ChatProvider } from './contexts/ChatContext.jsx'
import { SocketProvider } from './contexts/SocketContext.jsx'



createRoot(document.getElementById('root')).render(

  <StrictMode>
    
    <UserContextProvider>

      <SocketProvider>

        <ChatProvider>

          <RouterProvider router={router}/>

        </ChatProvider>
        
      </SocketProvider>
      
    </UserContextProvider>
    
  </StrictMode>
)
