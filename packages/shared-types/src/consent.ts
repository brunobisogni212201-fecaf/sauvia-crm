import type { ConsentType } from "./enums";

export interface UserConsent {
  id: string;
  userId: string;
  consentType: ConsentType;
  granted: boolean;
  grantedAt: string | null;
  revokedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateConsentDto {
  consentType: ConsentType;
  granted: boolean;
}
