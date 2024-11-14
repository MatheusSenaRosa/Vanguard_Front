import { SEO } from "@atoms";
import { NotFoundTemplate } from "@templates";

const NotFound = () => {
  return (
    <>
      <SEO title="Essa página não existe" />
      <NotFoundTemplate />
    </>
  );
};

export default NotFound;
