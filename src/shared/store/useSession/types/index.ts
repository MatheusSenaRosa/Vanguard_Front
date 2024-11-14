export interface IUser {
  id: string;
  name: string;
  status: string;
  email: string;
}

interface IApiResponse extends IUser {
  status: string;
  accessToken: string;
  refreshToken: string;
}

export interface IUseSession {
  user: IUser | null | undefined;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  setIsLoggingIn: (value: boolean) => void;
  activateAccount: () => void;
  createSession: (session: IApiResponse) => void;
  restoreSession: () => void;
  destroySession: () => Promise<void>;
}
