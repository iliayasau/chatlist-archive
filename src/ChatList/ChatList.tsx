import React, { useState, useMemo } from 'react';
import { Chat } from '../types';
import ChatListItem from './ChatListItem';
import { Container, ChatListWrapper } from './styles';

interface Props {
  chats: Chat[];
  setChatTitle: (title: string) => void;
}

const ChatList: React.FC<Props> = ({ chats, setChatTitle }) => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  const filteredChats = useMemo(() => {
    const chatsFiltered = chats.filter(chat => !chat.lastMessage.priority);
    chatsFiltered.sort((a, b) => new Date(b.lastMessage.dateCreated).getTime() - new Date(a.lastMessage.dateCreated).getTime());
    return chatsFiltered;
  }, [chats]);

  return (
    <Container>
      <ChatListWrapper>
        {filteredChats.map(chat => (
          <ChatListItem
            key={chat.chatId}
            chat={chat}
            setChatTitle={setChatTitle}
            isSelected={chat.chatId === selectedChat}
            setSelectedChat={setSelectedChat}
          />
        ))}
      </ChatListWrapper>
    </Container>
  );
};

export default ChatList;