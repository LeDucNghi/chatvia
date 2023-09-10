export interface UserProfile {
  username?: string;
  password?: string;
  email?: string;
  token?: string;
  message?: string;
}

export interface AuthState {
  isSignedIn: boolean;
}
