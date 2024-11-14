import { FrontendIcon, BackendIcon, DatabaseIcon, DesignIcon } from "@svg/trails";

import { ITrail } from "../types";

export const matchTrailsToIcons = (trails: ITrail[]) => {
  const icons: { [key: string]: string } = {
    frontendIcon: FrontendIcon,
    designIcon: DesignIcon,
    backendIcon: BackendIcon,
    databaseIcon: DatabaseIcon,
  };

  const matched = trails.map((item) => ({
    ...item,
    icon: icons[item.icon] as string,
  }));

  return matched;
};

export const truncateText = (text: string) => {
  const maxLength = 330;

  if (text.length <= maxLength) {
    return text;
  }

  let truncated = text.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  if (lastSpaceIndex !== -1) {
    truncated = truncated.substring(0, lastSpaceIndex);
  }

  return truncated + "...";
};
