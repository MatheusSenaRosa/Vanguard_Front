import Head from "next/head";

type Props = {
  title: string;
  description?: string;
};

export const SEO = ({ title, description }: Props) => {
  const defaultDescription = "Vanguard - cursos de tecnologia do iniciante ao avançado";

  return (
    <Head>
      <title>{title ? `${title} | Vanguard` : "Vanguard"}</title>

      <meta name="description" content={description || defaultDescription} />

      <meta
        name="keywords"
        content="aulas, trilhas, front-end, front end, back-end, back end, dados, cursos avançados, curso javascript, curso java, curso python"
      />
    </Head>
  );
};
