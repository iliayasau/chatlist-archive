import { useState, useEffect } from 'react';
import { Chat } from './types';
import { fetchChats } from './utils/api';
import ChatList from './ChatList/ChatList';
import isPropValid from '@emotion/is-prop-valid';
import { StyleSheetManager } from 'styled-components';
import {
  Wrapper, LeftColumn, LeftColumnHeader, RightColumn, RightColumnHeader
} from './globalStyles';

function App() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [chatTitle, setChatTitle] = useState<string>('');

  useEffect(() => {
    fetchChats().then(setChats);
  }, []);

  return (
    <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop) && prop !== 'isSelected' && prop !== 'avatar'}>
      <Wrapper>
        <LeftColumn>
          <LeftColumnHeader>Messaging</LeftColumnHeader>
          <ChatList chats={chats} setChatTitle={setChatTitle} />
        </LeftColumn>
        <RightColumn>
          <RightColumnHeader>{chatTitle}</RightColumnHeader>
        </RightColumn>
      </Wrapper>
    </StyleSheetManager>
  );
}

export default App;