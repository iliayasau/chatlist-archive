import React from 'react';
import { Chat } from '../types';
import {
  ChatListItemAvatar, ChatListItemDate, ChatListItemInfo, ChatListItemMessage, ChatListItemTitle, ChatListItemTitleWrapper, ChatListItemWrapper
} from './styles';
import { MY_ID } from '../utils/constants';

interface Props {
  chat: Chat;
  setChatTitle: (title: string) => void;
  isSelected: boolean;
  setSelectedChat: (chatId: string) => void;
}

const ChatListItem: React.FC<Props> = ({ chat, setChatTitle, isSelected, setSelectedChat }) => {
  const { lastMessage, title, members } = chat;
  const handleClick = () => {
    const generatedTitle = renderTitle(title, members);
    setChatTitle(generatedTitle);
    setSelectedChat(chat.chatId);
  };
  const formattedDate = formatDate(new Date(lastMessage.dateCreated));
  
  return (
    <ChatListItemWrapper onClick={handleClick} isSelected={isSelected}>
      <ChatListItemAvatar type={chat.type} avatar={chat.type === 'single' ? getAvatarUrl(members) : null} />
      <ChatListItemInfo>
        <ChatListItemTitleWrapper>
          <ChatListItemTitle>{renderTitle(title, members)}</ChatListItemTitle>
          <ChatListItemDate>{formattedDate}</ChatListItemDate>
        </ChatListItemTitleWrapper>
        <ChatListItemMessage>
          {renderSender(lastMessage.sender)}: {lastMessage.message}
        </ChatListItemMessage>
      </ChatListItemInfo>
    </ChatListItemWrapper>
  );
};

function getAvatarUrl(members: { firstname: string, lastname: string, id: string, profilePic: { url: string } | null }[]): string {
  for (let member of members) {
    if (member.id !== MY_ID && member.profilePic) {
      return member.profilePic.url;
    }
  }
  return '';
}

function renderTitle(title: string | null, members: { firstname: string, lastname: string }[]): string {
  if (title) {
    return title;
  }
    
    let generatedTitle = members.map(member => `${member.firstname} ${member.lastname}`).join(', ');

    if (generatedTitle.length > 25) {
      let trimmedTitle = '';
      let count = 0;
      for (let member of members) {
        const nextTitle = `${trimmedTitle}${member.firstname} ${member.lastname}, `;
        if (nextTitle.length > 25) {
          break;
        }
        count++;
        trimmedTitle = nextTitle;
      }

      const remainingMembers = members.length - count;
      if (remainingMembers > 0) {
        trimmedTitle = trimmedTitle.endsWith(', ') ? trimmedTitle.slice(0, -2) : trimmedTitle;
        trimmedTitle += ` + ${remainingMembers} people`;
      }
          
      return trimmedTitle.trim();
    }
    return generatedTitle;
  }

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