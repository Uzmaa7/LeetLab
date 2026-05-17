
import React, { useState } from 'react';
import Sidebar from '../components/TalkTown/Sidebar';
import Feed from '../components/TalkTown/Feed';
import DirectMessages from '../components/TalkTown/DirectMessages';
import CreatePostModal from '../components/TalkTown/CreatePostModal';
import Requests from '../components/TalkTown/Requests';
import SearchModal from '../components/TalkTown/SearchModal'

const TalkTown = () => {
    const [view, setView] = useState('feed'); // 'feed' or 'messages'
    const [isPostModalOpen, setPostModalOpen] = useState(false);

    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
       <div className="flex flex-col md:flex-row h-screen bg-black text-white overflow-hidden">
            {/* Sidebar with Navigation Icons */}
            <div className="order-2 md:order-1">
                <Sidebar 
                    setView={setView} 
                    activeView={view} 
                    openCreatePost={() => setPostModalOpen(true)} 
                    openSearch={() => setIsSearchOpen(true)}
                />
            </div>

            {/* Main Content Area */}
            <main className="flex-1 flex justify-center overflow-y-auto order-1 md:order-2 pb-16 md:pb-0">
                {view === 'feed' && <Feed />}
                {view === 'messages' && <DirectMessages />}
                {view === 'requests' && <Requests />}
            </main>

            {/* Modals */}
            {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}
            {isPostModalOpen && <CreatePostModal onClose={() => setPostModalOpen(false)} />}
        </div>
    );



    
};

export default TalkTown;