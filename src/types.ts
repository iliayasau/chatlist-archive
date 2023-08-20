export interface Chat {
  chatId: string;
  type: string;
  title: string | null;
  members: {
    id: string;
    firstname: string;
    lastname: string;
    profilePic: {
      url: string;
    } | null;
  }[];
  lastMessage: Message;
}
    
export interface Message {
  id: number;
  message: string;
  type: string; 
  dateCreated: string;
  priorityType: string;
  sender: Sender;
  priority: boolean;
}

interface Sender {
  id: string;
  firstname: string;
  lastname: string;
}