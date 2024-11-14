import { IMe } from "../types";

export const formatUserLocation = (data: IMe) => {
  const {
    localization: { country, state, city },
  } = data;

  if (country?.description === "Brasil") return `${city?.description}, ${state?.description}`;

  return country?.description;
};
