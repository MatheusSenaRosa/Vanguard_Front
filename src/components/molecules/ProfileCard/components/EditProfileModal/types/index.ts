export interface IForm {
  name: string;
  occupationId: string;
  isLocatedOutside: boolean;
  gender: string;
  gitHub: string;
  linkedIn: string;
  countryId: number;
  stateId: number;
  cityId: number;
}

export interface ICities {
  stateId: number;
  cities: {
    value: number;
    description: string;
  }[];
}
