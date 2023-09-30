export interface UserProfile {
  _id?: string;
  username?: string;
  password?: string;
  email?: string;
  token?: string;
  message?: string;
  avatar?: string;
}

export interface AuthState {
  isFetching: {
    isContacts: boolean;
  };

  isSignedIn: boolean;
  isValidUser: boolean;

  user: UserProfile | null | undefined;
  userList: UserProfile[];

  contacts: UserProfile[];
}
