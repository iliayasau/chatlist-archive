import React from 'react';
import { Chat } from '../types';
import {
  ChatListItemAvatar, ChatListItemDate, ChatListItemInfo, ChatListItemMessage, ChatListItemTitle, ChatListItemTitleWrapper, ChatListItemWrapper
} from './styles';
import { MY_ID } from '../utils/constants';

interface Props {
  chat: Chat;
  isSelected: boolean;
  setSelectedChat: (id: string) => void;
  archiveChat?: (chatId: string) => void; 
}

const ChatListItem: React.FC<Props> = ({ chat, isSelected, setSelectedChat, archiveChat }) => {
  const { lastMessage, title } = chat;
  const handleClick = () => {
    setSelectedChat(chat.id);
    if (archiveChat) {
      archiveChat(chat.id);
    }
  };
  const formattedDate = formatDate(new Date(lastMessage.dateCreated));
  
  return (
    <ChatListItemWrapper onClick={handleClick} isSelected={isSelected}>
      <ChatListItemAvatar type={chat.type} avatar={chat.type === 'single' ? lastMessage.sender.profilePic : 'group'} />
      <ChatListItemInfo>
        <ChatListItemTitleWrapper>
          <ChatListItemTitle>{title}</ChatListItemTitle>
          <ChatListItemDate>{formattedDate}</ChatListItemDate>
        </ChatListItemTitleWrapper>
        <ChatListItemMessage>
          {renderSender(lastMessage.sender)}: {lastMessage.message}
        </ChatListItemMessage>
      </ChatListItemInfo>
    </ChatListItemWrapper>
  );
};

  function renderSender(sender: { id: string, firstname: string, lastname: string }): string {
    if (sender.id === MY_ID) {
      return "me";
    }
    return `${sender.firstname} ${sender.lastname}`;
  }
  
  function formatDate(date: Date): string {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
  
    if (date >= today) {
      return date.toLocaleTimeString();
    } else if (date >= yesterday) {
      return 'Yesterday';
    } else if (date >= getStartOfWeek(today)) {
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  }
  
  function getStartOfWeek(date: Date) {
    const dayOfWeek = date.getDay();
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - dayOfWeek);
    weekStart.setDate(weekStart.getDate() - 6);
    weekStart.setHours(0, 0, 0, 0);
    return weekStart;
  }
  
  export default ChatListItem;