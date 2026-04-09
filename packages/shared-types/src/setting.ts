export interface Setting {
  id: string;
  key: string;
  value: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}
