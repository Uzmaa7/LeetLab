import React from 'react';
import { Github, Twitter, Linkedin, Instagram, FlaskConical, Heart } from 'lucide-react';

const SeventhPage = () => {
  return (
    // Background changed to a slightly lighter black for better visibility
    <footer className="w-full bg-[#121212] border-t border-white/5 pt-20 pb-12 px-10 md:px-20 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP SECTION: LOGO & UPDATED LINKS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-12">
          
          {/* BRANDING */}
          <div className="md:col-span-4 space-y-8">
           <div className="flex items-center  cursor-pointer group" onClick={() => navigate('/')}>
                
                {/* Icon is now tilted 15 degrees to the right */}
                <FlaskConical 
                    size={26} 
                    className="text-white group-hover:text-orange-500 transition-all duration-300 transform rotate-[15deg] group-hover:rotate-[25deg]" 
                />
                
                {/* Font weight adjusted for sharp professional look */}
                <span className="text-xl font-bold tracking-tighter bg-gradient-to-r from-white via-white/80 to-orange-600 bg-clip-text text-transparent">
                    LeetLab
                </span>
            </div>
            <h3 className="text-zinc-400 text-lg leading-relaxed max-w-xs font-medium">
              Revolutionizing how developers solve, discuss, and retain complex logic.
            </h3>
            <div className="flex gap-6 text-zinc-500">
              <Github size={20} className="hover:text-white cursor-pointer transition-all hover:-translate-y-1" />
              <Twitter size={20} className="hover:text-white cursor-pointer transition-all hover:-translate-y-1" />
              <Instagram size={20} className="hover:text-white cursor-pointer transition-all hover:-translate-y-1" />
              <Linkedin size={20} className="hover:text-white cursor-pointer transition-all hover:-translate-y-1" />
            </div>
          </div>

          {/* UPDATED QUICK LINKS AS PER YOUR REQUEST */}
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">
            
            {/* PRODUCT */}
            <div className="space-y-6">
              <h4 className="text-white text-sm font-bold uppercase tracking-widest">Product</h4>
              <ul className="space-y-4 text-zinc-500 text-sm font-medium">
                <li className="hover:text-orange-500 cursor-pointer transition-colors">Explore Questions</li>
                <li className="hover:text-orange-500 cursor-pointer transition-colors">Collections</li>
                <li className="hover:text-orange-500 cursor-pointer transition-colors">Live Contests</li>
                <li className="hover:text-orange-500 cursor-pointer transition-colors">Analytics</li>
              </ul>
            </div>

            {/* COMPANY */}
            <div className="space-y-6">
              <h4 className="text-white text-sm font-bold uppercase tracking-widest">Company</h4>
              <ul className="space-y-4 text-zinc-500 text-sm font-medium">
                <li className="hover:text-orange-500 cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-orange-500 cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-orange-500 cursor-pointer transition-colors">Engineering Blog</li>
                <li className="hover:text-orange-500 cursor-pointer transition-colors">Contact Support</li>
              </ul>
            </div>

            {/* LEGAL */}
            <div className="space-y-6">
              <h4 className="text-white text-sm font-bold uppercase tracking-widest">Legal</h4>
              <ul className="space-y-4 text-zinc-500 text-sm font-medium">
                <li className="hover:text-orange-500 cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-orange-500 cursor-pointer transition-colors">Terms of Service</li>
                <li className="hover:text-orange-500 cursor-pointer transition-colors">Cookie Policy</li>
              </ul>
            </div>

          </div>
        </div>

        {/* BOTTOM BAR - Compact Gap */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5">
          <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
            © 2026 LeetLab Inc. All rights reserved.
          </div>
          
          <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
            <span>Made with</span>
            <Heart size={12} className="text-orange-600 fill-orange-600" />
            by Uzma Khan
          </div>
        </div>

      </div>
    </footer>
  );
};

export default SeventhPage;



