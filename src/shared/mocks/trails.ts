import { v4 as uuid } from "uuid";

export const TRAILS_MOCK = [
  {
    id: uuid(),
    title: "Front-end",
    icon: "frontendIcon",
    description:
      "O Front-end é a primeira interação entre o usuário e a aplicação, é a camada visual, onde o usuario pode interagir. Nessa trilha você aprenderá a usar tecnologias como: HTML5, CSS3, JavaScript, Typescript, React, Next, Styled-components, Animations, Hooks, Plataformas usadas durante o desenvolvimento profissional e muito mais.",
    link: "/aulas/frontend.",
  },
  {
    id: uuid(),
    title: "Back-end",
    icon: "backendIcon",
    description:
      "O Back-end é o servidor da aplicação, a camada responsavel por gerenciar as regras de negocio e trasnferencia de dados entre os usuarios e a empresa.",
    link: "/aulas/backend",
  },
  {
    id: uuid(),
    title: "Dados",
    icon: "databaseIcon",
    description:
      "O banco de dados é responsavel por armazenar as informações dos usuários, existem várias formas de armazenamento de dados e cada uma com sua particularidade, nessa trilha você terá um visão sobre os mais usados no mercado.",
    link: "/aulas/dados",
  },
  {
    id: uuid(),
    title: "Design",
    icon: "designIcon",
    description:
      "Parte essencial do desenvolvimento de uma aplicação, o design é uma área sem limites, além de facilitar a navegação do usuário também o mantém na aplicação.",
    link: "/aulas/design",
  },
];
