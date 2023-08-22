import axios from 'axios';
import { Chat } from '../types';

const API_URL = 'https://api.staging.hypercare.com/graphql/private';

const ACCESS_TOKEN = '3a1aeb259e5987a8be639d05714cc1dd2f87ff15';
const HYPERCARE_SCOPE = 'eyJvcmdhbml6YXRpb25JZCI6MX0=';

// Define the GraphQL query as a string
const GET_CHATS_QUERY = `
  query organizationChats($continuationId: ID, $limit: Int) {
    archivedChats(continuationId: $continuationId, limit: $limit) {
      chats {
        ...basicChatFields
      }
    }
  }

  fragment basicChatFields on Chat {
    id
    title
    type
    lastMessage {
      ...messageFields
    }
    muted
    dateCreated
    isArchived
  }

  fragment messageFields on Message {
    id
    priorityType
    message
    image
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

export async function fetchArchivedChats(): Promise<Chat[]> {
  const payload = {
    query: GET_CHATS_QUERY,
    variables: {
      limit: 12,
      isPriority: false
    }
  };

  const headers = {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
    'hypercare-scope': HYPERCARE_SCOPE
  };

  const response = await axios.post(API_URL, payload, { headers: headers });
  
  return response.data.data.archivedChats.chats; // Updated path based on new query structure
}
