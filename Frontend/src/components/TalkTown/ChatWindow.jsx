import React from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

const ChatWindow = ({ activeChat }) => {
    return (
        <div className="flex flex-col h-full bg-black">
            <ChatHeader name={activeChat.name} />
            
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                <MessageList />
            </div>

            <ChatInput />
        </div>
    );
};

export default ChatWindow;