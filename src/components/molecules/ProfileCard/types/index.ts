export interface IMe {
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
}
