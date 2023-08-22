export interface Chat {
  id: string;
  type: string;
  title: string | null;
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
  profilePic: string;
}