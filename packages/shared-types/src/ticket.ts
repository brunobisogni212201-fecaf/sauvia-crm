import type { TicketStatus, Priority } from "./enums";

export interface Ticket {
  id: string;
  userId: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  content: string;
  isStaff: boolean;
  createdAt: string;
}

export interface CreateTicketDto {
  subject: string;
  description: string;
  priority?: Priority;
}

export interface CreateTicketMessageDto {
  content: string;
  isStaff?: boolean;
}
