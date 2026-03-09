import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast"




import { Loader } from "lucide-react";

import SignupPage from "./pages/SignUpPage.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx"


const App = () => {


  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-start">
      {/* <Toaster />
      <Routes>
        
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />

        {/* Problem Set Page (Jahan saari list dikhegi) */}
        {/* <Route path="/problems" element={<ProblemPage />} />


    <Route path="/add-problem" element={<AddProblem />} /> */}
       
        
          
          {/* Individual Problem Detail Page (Solving area) */}
        {/* <Route path="/problem/:id" element={<ProblemDetail />} /> */}
       

      {/* </Routes> */} 
    </div>
  )
}

export default App;