import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: auto;
  min-height: 100vh;
  background: #fff;
  display: flex;
`;

export const LeftColumn = styled.div`
  margin: 0;
  padding: 0;
  min-width: 350px;
  height: auto;
  background: #fff;
  border-right: #dedede solid 1px;
`;

export const LeftColumnHeader = styled.div`
  padding: 16px;
  border-bottom: #dedede solid 1px;
  text-align: left;
`;

export const LeftColumnArchivedHeader = styled.div`
  padding: 16px;
  border-bottom: #dedede solid 1px;
  border-top: #dedede solid 1px;
  text-align: left;
`;

export const RightColumn = styled.div`
  width: 100%;
`;

export const RightColumnHeader = styled.div`
  padding: 16px;
  border-bottom: #dedede solid 1px;
  text-align: center;
  height: 21px;
`;