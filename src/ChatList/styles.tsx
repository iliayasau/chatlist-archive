import styled from 'styled-components';
import GroupAvatar from '../assets/group-avatar.svg';
import PlacerholderAvatar from '../assets/placeholder-avatar.png';

export const Container = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: auto;
  background: #fff;
`;

export const ChatListWrapper = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
`;

export const ChatListItemWrapper = styled.li<{ isSelected: boolean }>`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? '#f2f2f2' : '#fff')}
`;

export const ChatListItemAvatar = styled.div<{ avatar: string | null, type: string }>`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  flex-shrink: 0;
  background-image: url(${(props) => (props.type === 'group' ? GroupAvatar : (props.avatar ? props.avatar : PlacerholderAvatar))});
  background-color: #cac9c9;
  background-repeat: no-repeat;
  background-size: ${(props) => (props.type === 'group' ? '60%' : '100%')};
  background-position: center;
  margin-right: 8px;
`;

export const ChatListItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  width: calc(100% - 50px);
`;

export const ChatListItemTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  color: #464646;
  font-weight: 500;
`;

export const ChatListItemTitle = styled.div`
  font-size: 14px;
`;

export const ChatListItemDate = styled.div`
  font-size: 12px;
`;

export const ChatListItemMessage = styled.div`
  font-size: 14px;
  color: #aaa;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;
