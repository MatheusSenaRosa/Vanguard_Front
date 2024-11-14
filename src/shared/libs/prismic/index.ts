import * as prismic from "@prismicio/client";
import { LinkResolverFunction } from "@prismicio/helpers";
import * as prismicNext from "@prismicio/next";

import sm from "./sm.json";

export const repositoryName = prismic.getRepositoryName(sm.apiEndpoint);

// Update the Link Resolver to match your project's route structure
export const linkResolver: LinkResolverFunction = (doc) => {
  switch (doc.type) {
    case "posts":
      return `/${doc.uid}`;
    default:
      return "";
  }
};

export const createClient = () => {
  const client = prismic.createClient(sm.apiEndpoint);

  prismicNext.enableAutoPreviews({
    client,
  });

  return client;
};
