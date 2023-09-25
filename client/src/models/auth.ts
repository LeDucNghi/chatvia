export interface UserProfile {
  _id?: number;
  username?: string;
  password?: string;
  email?: string;
  token?: string;
  message?: string;
  avatar?: string;
}

export interface AuthState {
  isSignedIn: boolean;
  user: UserProfile | null | undefined;
  isValidUser: boolean;
}
