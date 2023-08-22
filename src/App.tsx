import { useState, useEffect } from 'react';
import { Chat } from './types';
import { fetchArchivedChats } from './utils/api';
import ChatList from './ChatList/ChatList';
import isPropValid from '@emotion/is-prop-valid';
import { StyleSheetManager } from 'styled-components';
import {
  Wrapper, LeftColumn, LeftColumnHeader, LeftColumnArchivedHeader, RightColumn, RightColumnHeader
} from './globalStyles';

function App() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [archivedChats, setArchivedChats] = useState<Chat[]>([]);

  useEffect(() => {
    fetchArchivedChats().then(setChats);
  }, []);

  const archiveChat = (chatId: string) => {
    const chatToArchive = chats.find(chat => chat.id === chatId);
    if (!chatToArchive) return;
  
    setChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
    setArchivedChats(prevArchivedChats => [...prevArchivedChats, chatToArchive]);
  }

  const unarchiveChat = (chatId: string) => {
    const chatToUnarchive = archivedChats.find(chat => chat.id === chatId);
    if (chatToUnarchive) {
      setArchivedChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
      setChats(prevChats => [...prevChats, chatToUnarchive]);
    }
  }

  return (
    <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop) && prop !== 'isSelected' && prop !== 'avatar'}>
      <Wrapper>
        <LeftColumn>
          <LeftColumnHeader>Unarchived</LeftColumnHeader>
          <ChatList chats={chats} archiveChat={archiveChat} />
          <LeftColumnArchivedHeader>Archived</LeftColumnArchivedHeader>
          <ChatList chats={archivedChats} archiveChat={unarchiveChat} />
        </LeftColumn>
        <RightColumn>
          <RightColumnHeader>Conversation</RightColumnHeader>
        </RightColumn>
      </Wrapper>
    </StyleSheetManager>
  );
}

export default App;