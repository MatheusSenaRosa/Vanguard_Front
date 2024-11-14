import * as yup from "yup";

import { formatEmail, formatName } from "@utils";

import { IForm } from "../types";

export const schema = yup.object({
  name: yup
    .string()
    .required("Campo obrigatório")
    .min(5, "Mínimo de 5 caracteres")
    .test({
      message: "Insira o nome completo",
      test: (value) => {
        if (!value || !value.trim()) return true;

        return value.trim().includes(" ");
      },
    }),
  email: yup.string().email("Email inválido").required("Campo obrigatório"),
  isVerified: yup.boolean(),
  password: yup
    .string()
    .required("Campo obrigatório")
    .min(8, "Mínimo de 8 caracteres")
    .test({
      message: "A senha deve conter letras maiúsculas, minúsculas e números",
      test: (value) => {
        if (value) {
          const uppercaseRegex = /[A-Z]/;
          const lowercaseRegex = /[a-z]/;
          const numberRegex = /[0-9]/;

          return uppercaseRegex.test(value) && lowercaseRegex.test(value) && numberRegex.test(value);
        }
        return true;
      },
    }),
  confirmationPassword: yup.string().test({
    message: "As senhas devem ser iguais",
    test: (value, context) => context.parent.password === value,
  }),
});

export const formatForm = (data: IForm): IForm => ({
  ...data,
  email: formatEmail(data.email),
  name: formatName(data.name),
});
