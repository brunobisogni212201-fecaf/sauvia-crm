import type { MessageDirection } from "./enums";

export interface Message {
  id: string;
  patientId: string;
  direction: MessageDirection;
  content: string;
  whatsappId: string | null;
  createdAt: string;
}

export interface CreateMessageDto {
  patientId: string;
  direction: MessageDirection;
  content: string;
  whatsappId?: string;
}
