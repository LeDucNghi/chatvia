export interface UserProfile {
  id?: number;
  username?: string;
  password?: string;
  email?: string;
  token?: string;
  message?: string;
  avatar?: string;
}

export interface AuthState {
  isSignedIn: boolean;
}
