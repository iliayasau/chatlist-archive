import axios from 'axios';
import { Chat } from '../types';

const API_URL = 'https://api.staging.hypercare.com/graphql/private';

const ACCESS_TOKEN = '3a1aeb259e5987a8be639d05714cc1dd2f87ff15';

const HYPERCARE_SCOPE = 'eyJvcmdhbml6YXRpb25JZCI6MX0='; 

const GET_CHATS_QUERY = `
  query organizationChats($continuationId: ID, $limit: Int, $isPriority: Boolean) {
    chatsForOrganization(continuationId: $continuationId, limit: $limit, isPriority: $isPriority) {
      chats {
        ...basicChatFields
        unreadPriorityMessages
      }
    }
  }

  fragment basicChatFields on Chat {
    chatId: id
    title
    type
    members {
      ...chatMemberFields
    }
    lastMessage {
      ...messageFields
    }
    muted
    status
    dateCreated
    isArchived
    unreadPriorityMessages
  }

  fragment chatMemberFields on ChatMember {
    id
    firstname
    lastname
    username
    role
    profilePic {
      url
    }
    status
    privilege
    workStatus
    statusExpiryDate
    statusDescription
    workStatusProxy {
      ...publicUserStatusFields
    }
  }

  fragment messageFields on Message {
    id
    priority
    message
    image
    # attachment {
    #   url
    #   mimeType
    #   fileName
    # }
    type
    dateCreated
    sender {
      ...publicUserFields
    }
    readBy {
      ...readReceiptFields
    }
    data {
      __typename
      ... on ConsultMessageData {
        mrn
        firstname
        lastname
        details
      }
    }
  }

  fragment readReceiptFields on ReadReceipt {
    messageId
    user {
      ...publicUserFields
    }
    timestamp
  }

  fragment publicUserFields on PublicUser {
    id
    firstname
    lastname
    username
    role
    profilePic {
      url
    }
    workStatus
    statusDescription
    workStatusProxy {
      ...publicUserStatusFields
    }
  }

  fragment publicUserStatusFields on PublicUser {
    id
    firstname
    lastname
    username
    role
    profilePic {
      url
    }
  }
`;

export async function fetchChats(): Promise<Chat[]> {
  const payload = {
    query: GET_CHATS_QUERY,
    variables: {
      isPriority: false,
      limit: 20
    }
  };
  
  const headers = {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
    'hypercare-scope': HYPERCARE_SCOPE
  };
  
  const response = await axios.post(API_URL, payload, { headers: headers });
  
  return response.data.data.chatsForOrganization.chats;
}
  