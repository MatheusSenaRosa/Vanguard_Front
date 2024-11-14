import axios from "axios";

import { api } from "../config";
import { GetCountries, GetOccupations, GetStates, IUseProfileService } from "./types";

export const useProfileServices = (): IUseProfileService => {
  const ibgeBaseUrl = "https://servicodados.ibge.gov.br/api/v1/localidades";

  const getOccupations: GetOccupations = async () => {
    const { data } = await api.get("/occupations");

    return data;
  };

  const getStates: GetStates = async () => {
    const { data } = await axios.get(`${ibgeBaseUrl}/estados`);

    return data;
  };

  const getCountries: GetCountries = async () => {
    const { data } = await axios.get(`${ibgeBaseUrl}/paises`);

    return data;
  };

  return {
    getUserById: async (id) => {
      const { data } = await api.get(`/customers/${id}`);

      return data;
    },
    updateProfile: async (body) => {
      const { data } = await api.put("/me", body);

      return data;
    },
    changePassword: async (body) => {
      await api.put("/me/change-password", body);
    },
    getCitiesByStateId: async (stateId) => {
      const { data } = await axios.get(`${ibgeBaseUrl}/estados/${stateId}/municipios`);

      return data;
    },
    getProfileModalData: async () => {
      try {
        const [occupationsResponse, countriesResponse, statesResponse] = await Promise.all([
          getOccupations(),
          getCountries(),
          getStates(),
        ]);

        const states = statesResponse.map((item) => ({
          value: item.id,
          description: item.nome,
        }));

        const countries = countriesResponse.map((item) => ({
          value: item.id.M49,
          description: item.nome,
        }));

        const occupations = occupationsResponse.occupations.map((item) => ({
          value: item.id,
          description: item.description,
        }));

        return {
          states,
          occupations,
          countries,
        };
      } catch {
        throw new Error();
      }
    },
  };
};
