export type ChatUser = "AI" | "HUMAN";
export interface Chats {
  id: number;
  user: ChatUser;
  message: string;
  date?: string;
}
