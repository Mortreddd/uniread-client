export type WebSocketEventType =
  | "CHAT_UPDATED"
  | "MESSAGE_RECEIVED"
  | "MESSAGE_READ"
  | "TYPING_STARTED"
  | "TYPING_STOPOPED"
  | "PARTICIPANT_READ";

export interface WebSocketEvent<T> {
  type: WebSocketEventType;
  data: T;
}
