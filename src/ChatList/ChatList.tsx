import React, { useState, useMemo } from 'react';
import { Chat } from '../types';
import ChatListItem from './ChatListItem';
import { Container, ChatListWrapper } from './styles';

interface Props {
  chats: Chat[];
  archiveChat?: (chatId: string) => void; 
}

const ChatList: React.FC<Props> = ({ chats, archiveChat }) => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  const filteredChats = useMemo(() => {
    const chatsFiltered = chats.filter(chat => !chat.lastMessage.priority);
    chatsFiltered.sort((a, b) => new Date(b.lastMessage.dateCreated).getTime() - new Date(a.lastMessage.dateCreated).getTime());
    return chatsFiltered;
  }, [chats]);

  console.log('filteredChats: ', filteredChats);

  return (
    <Container>
      <ChatListWrapper>
        {filteredChats.map(chat => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            isSelected={chat.id === selectedChat}
            setSelectedChat={setSelectedChat}
            archiveChat={archiveChat}
          />
        ))}
      </ChatListWrapper>
    </Container>
  );
};

export default ChatList;