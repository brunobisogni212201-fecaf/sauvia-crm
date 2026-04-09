import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  real,
  jsonb,
  pgEnum,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

// Enums
export const roleEnum = pgEnum("role", ["NUTRITIONIST", "ADMIN"]);
export const genderEnum = pgEnum("gender", ["MALE", "FEMALE", "OTHER"]);
export const appointmentTypeEnum = pgEnum("appointment_type", [
  "INITIAL",
  "FOLLOWUP",
  "RETURN",
  "EMERGENCY",
  "ONLINE",
]);
export const appointmentStatusEnum = pgEnum("appointment_status", [
  "SCHEDULED",
  "CONFIRMED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
  "NO_SHOW",
]);
export const planStatusEnum = pgEnum("plan_status", [
  "ACTIVE",
  "COMPLETED",
  "CANCELLED",
]);
export const ticketStatusEnum = pgEnum("ticket_status", [
  "OPEN",
  "IN_PROGRESS",
  "WAITING",
  "RESOLVED",
  "CLOSED",
]);
export const priorityEnum = pgEnum("priority", [
  "LOW",
  "MEDIUM",
  "HIGH",
  "URGENT",
]);
export const messageDirectionEnum = pgEnum("message_direction", [
  "INBOUND",
  "OUTBOUND",
]);
export const consentTypeEnum = pgEnum("consent_type", [
  "MARKETING",
  "ANALYTICS",
  "DATA_SHARING",
  "WHATSAPP",
]);

// Tables
export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey().$defaultFn(createId),
    email: text("email").notNull(),
    name: text("name"),
    cpf: text("cpf").notNull(),
    phone: text("phone"),
    externalAuthId: text("external_auth_id").notNull(),
    role: roleEnum("role").default("NUTRITIONIST").notNull(),
    avatarUrl: text("avatar_url"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("users_email_idx").on(table.email),
    uniqueIndex("users_cpf_idx").on(table.cpf),
    uniqueIndex("users_external_auth_id_idx").on(table.externalAuthId),
  ],
);

export const patients = pgTable(
  "patients",
  {
    id: text("id").primaryKey().$defaultFn(createId),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    cpf: text("cpf"),
    birthDate: timestamp("birth_date"),
    gender: genderEnum("gender"),
    height: real("height"),
    weight: real("weight"),
    goal: text("goal"),
    medicalNotes: text("medical_notes"),
    address: text("address"),
    emergencyContact: text("emergency_contact"),
    active: boolean("active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("patients_user_id_idx").on(table.userId)],
);

export const appointments = pgTable(
  "appointments",
  {
    id: text("id").primaryKey().$defaultFn(createId),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    patientId: text("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    dateTime: timestamp("date_time").notNull(),
    duration: integer("duration").default(60).notNull(),
    type: appointmentTypeEnum("type").notNull(),
    status: appointmentStatusEnum("status").default("SCHEDULED").notNull(),
    notes: text("notes"),
    meetingUrl: text("meeting_url"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("appointments_user_date_idx").on(table.userId, table.dateTime),
    index("appointments_patient_id_idx").on(table.patientId),
  ],
);

export const nutritionPlans = pgTable(
  "nutrition_plans",
  {
    id: text("id").primaryKey().$defaultFn(createId),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    patientId: text("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    meals: jsonb("meals").notNull(),
    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date"),
    status: planStatusEnum("status").default("ACTIVE").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("nutrition_plans_patient_id_idx").on(table.patientId),
    index("nutrition_plans_user_id_idx").on(table.userId),
  ],
);

export const messages = pgTable(
  "messages",
  {
    id: text("id").primaryKey().$defaultFn(createId),
    patientId: text("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    direction: messageDirectionEnum("direction").notNull(),
    content: text("content").notNull(),
    whatsappId: text("whatsapp_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("messages_patient_id_idx").on(table.patientId)],
);

export const tickets = pgTable(
  "tickets",
  {
    id: text("id").primaryKey().$defaultFn(createId),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    subject: text("subject").notNull(),
    description: text("description").notNull(),
    status: ticketStatusEnum("status").default("OPEN").notNull(),
    priority: priorityEnum("priority").default("MEDIUM").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("tickets_user_status_idx").on(table.userId, table.status)],
);

export const ticketMessages = pgTable(
  "ticket_messages",
  {
    id: text("id").primaryKey().$defaultFn(createId),
    ticketId: text("ticket_id")
      .notNull()
      .references(() => tickets.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    isStaff: boolean("is_staff").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("ticket_messages_ticket_id_idx").on(table.ticketId)],
);

export const knowledgeArticles = pgTable(
  "knowledge_articles",
  {
    id: text("id").primaryKey().$defaultFn(createId),
    title: text("title").notNull(),
    content: text("content").notNull(),
    category: text("category").notNull(),
    slug: text("slug").notNull(),
    published: boolean("published").default(false).notNull(),
    order: integer("order").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("knowledge_articles_slug_idx").on(table.slug)],
);

export const auditLogs = pgTable(
  "audit_logs",
  {
    id: text("id").primaryKey().$defaultFn(createId),
    userId: text("user_id"),
    action: text("action").notNull(),
    entity: text("entity").notNull(),
    entityId: text("entity_id"),
    metadata: jsonb("metadata"),
    ipAddress: text("ip_address"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("audit_logs_user_id_idx").on(table.userId),
    index("audit_logs_created_at_idx").on(table.createdAt),
  ],
);

export const settings = pgTable(
  "settings",
  {
    id: text("id").primaryKey().$defaultFn(createId),
    key: text("key").notNull(),
    value: jsonb("value").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("settings_key_idx").on(table.key)],
);

export const userConsents = pgTable(
  "user_consents",
  {
    id: text("id").primaryKey().$defaultFn(createId),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    consentType: consentTypeEnum("consent_type").notNull(),
    granted: boolean("granted").default(false).notNull(),
    grantedAt: timestamp("granted_at"),
    revokedAt: timestamp("revoked_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("user_consents_user_id_idx").on(table.userId)],
);
