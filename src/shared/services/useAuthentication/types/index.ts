type SignInBody = {
  email: string;
  password: string;
};

type SignInResponse = {
  id: string;
  email: string;
  status: string;
  name: string;
  accessToken: string;
  refreshToken: string;
};

type SignIn = (body: SignInBody) => Promise<SignInResponse>;

type SignUpBody = {
  email: string;
  name: string;
  password: string;
};

type SignUpResponse = {
  id: string;
  email: string;
  status: string;
  name: string;
  accessToken: string;
  refreshToken: string;
};

type SignUp = (body: SignUpBody) => Promise<SignUpResponse>;

type RefreshTokenResponse = {
  id: string;
  email: string;
  status: string;
  name: string;
  accessToken: string;
  refreshToken: string;
};

type RefreshToken = (refreshToken: string) => Promise<RefreshTokenResponse>;

type ForgotPassword = (email: string) => Promise<void>;

type ResetPasswordBody = {
  email: string;
  newPassword: string;
  token: string;
};

type ResetPassword = (body: ResetPasswordBody) => Promise<void>;

export type WhoAmIResponse = {
  id: string;
  name: string;
  gitHub: string;
  linkedIn: string;
  gender: string;
  occupation: {
    id: string;
    description: string;
  };
  localization: {
    country: {
      id: number;
      description: string;
    };
    state: {
      id: number;
      description: string;
    };
    city: {
      id: number;
      description: string;
    };
  };
  email: string;
  status: string;
  createdAt: Date;
};
type WhoAmI = (ignoreCatch?: boolean) => Promise<WhoAmIResponse>;

type ResendActivationEmail = () => Promise<void>;

type ActivateAccount = (token: string) => Promise<void>;

export interface IUseAuthentication {
  resendActivationEmail: ResendActivationEmail;
  activateAccount: ActivateAccount;
  signIn: SignIn;
  signUp: SignUp;
  refreshToken: RefreshToken;
  forgotPassword: ForgotPassword;
  resetPassword: ResetPassword;
  whoAmI: WhoAmI;
}
