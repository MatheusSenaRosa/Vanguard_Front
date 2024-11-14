type UpdateProfileResponse = {
  id: string;
  name: string;
  gitHub: string;
  linkedIn: string;
  status: string;
  gender: string;
  email: string;
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
  createdAt: string;
};

type UpdateProfileBody = {
  name: string;
  countryId: number;
  stateId: number;
  cityId: number;
  gitHub: string;
  linkedIn: string;
  gender: string;
  occupationId: string;
};

type ChangePasswordBody = {
  currentPassword: string;
  newPassword: string;
};

type UpdateProfile = (body: UpdateProfileBody) => Promise<UpdateProfileResponse>;

type ChangePassword = (body: ChangePasswordBody) => Promise<void>;

type GetCitiesByStateResponse = { id: number; nome: string }[];

type GetCitiesByStateId = (stateId: number) => Promise<GetCitiesByStateResponse>;

type GetStatesResponse = { id: number; nome: string }[];

export type GetStates = () => Promise<GetStatesResponse>;

type GetCountriesResponse = { id: { M49: number }; nome: string }[];

export type GetCountries = () => Promise<GetCountriesResponse>;

type GetProfileModalData = () => Promise<{
  states: { value: number; description: string }[];
  occupations: { value: string; description: string }[];
  countries: { value: number; description: string }[];
}>;

type GetOccupationsResponse = {
  occupations: {
    id: string;
    description: string;
  }[];
};

export type GetOccupations = () => Promise<GetOccupationsResponse>;

export type GetUserByIdResponse = {
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

export type GetUserById = (id: string) => Promise<GetUserByIdResponse>;

export interface IUseProfileService {
  getUserById: GetUserById;
  updateProfile: UpdateProfile;
  changePassword: ChangePassword;
  getCitiesByStateId: GetCitiesByStateId;
  getProfileModalData: GetProfileModalData;
}
