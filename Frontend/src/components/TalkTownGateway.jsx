


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Unlock } from 'lucide-react';

const TalkTownGateway = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleEnter = () => {
        setIsOpen(true);
        // Cinematic delay for the gates to fully open
        setTimeout(() => {
            navigate('/user/talktown', { state: { showActions: true } });
        }, 2000);
    };

    const textStyle = {
        background: 'linear-gradient(to bottom, #d6d3d1 0%, #a8a29e 30%, #78716c 60%, #44403c 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.8)) contrast(1.1)',
    };

return (
        <div className="relative h-screen w-full bg-black overflow-hidden font-sans">
            
            {/* GATES CONTAINER */}
            <div className="absolute inset-0 flex z-20">
                
                {/* LEFT GATE + "TALK" */}
                <div className={`relative h-full w-1/2 transition-transform duration-[2000ms] ease-[cubic-bezier(0.7,0,0.3,1)]
                    ${isOpen ? '-translate-x-full' : 'translate-x-0'}`}>
                    <img 
                        src="/LeftGate.jpg" 
                        alt="Left Gate" 
                        className="h-full w-full object-cover " 
                    />
                    
                
                    <div className="absolute inset-y-0 right-0 flex items-center pr-10 translate-x-0">
                        <h1 className="text-8xl font-black tracking-tighter uppercase italic select-none" style={textStyle}>
                            Talk
                        </h1>
                    </div>
                    <div className="absolute right-0 top-0 h-full w-[1px] bg-white/5" />
                </div>

                {/* RIGHT GATE + "TOWN" */}
                <div className={`relative h-full w-1/2 transition-transform duration-[2000ms] ease-[cubic-bezier(0.7,0,0.3,1)]
                    ${isOpen ? 'translate-x-full' : 'translate-x-0'}`}>
                    <img 
                        src="/RightGate.jpeg" 
                        alt="Right Gate" 
                        className="h-full w-full object-cover " 
                    />


                    <div className="absolute inset-y-0 left-0 flex items-center pl-10 translate-x-0">
                        <h1 className="text-8xl font-black tracking-tighter uppercase italic select-none" style={textStyle}>
                            Town
                        </h1>
                    </div>
                </div>
            </div>

            {/* OVERLAY CONTENT */}
            <div className={`absolute inset-0 z-30 flex items-center justify-center transition-all duration-1000 ${isOpen ? 'opacity-0 scale-90' : 'opacity-100'}`}>
                
                {/* LOCK SEAL */}
                <div className="relative  cursor-pointer group" onClick={handleEnter}>
                    <div className="relative w-16 h-16 rounded-full border border-white/10 bg-black/80 backdrop-blur-md flex items-center justify-center shadow-2xl transition-all group-hover:border-stone-500">
                        {isOpen ? (
                            <Unlock className="text-stone-400 animate-pulse" size={24} strokeWidth={1} />
                        ) : (
                            <Lock className="text-stone-600 group-hover:text-stone-200 transition-colors" size={24} strokeWidth={1} />
                        )}
                    </div>
                </div>

                
            </div>
        </div>
    );
    
};

export default TalkTownGateway;