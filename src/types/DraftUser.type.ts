export interface DraftUser {
  email: string;
  verified: boolean;
  createdAt: Date;
  expiresAt: Date | null;
}
