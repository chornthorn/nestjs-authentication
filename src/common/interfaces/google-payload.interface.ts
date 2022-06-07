export interface OAuthPayload {
  id: string;
  firstName: string;
  lastName: string;
  username?: string;
  email: string;
  profileImage: string;
  accessToken: string;
  refreshToken: string;
}
