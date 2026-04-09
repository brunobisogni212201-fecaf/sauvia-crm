export * from "./enums";
export * from "./user";
export * from "./patient";
export * from "./appointment";
export * from "./nutrition-plan";
export * from "./message";
export * from "./ticket";
export * from "./knowledge-article";
export * from "./audit-log";
export * from "./setting";
export * from "./consent";

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code: string;
  statusCode: number;
}
