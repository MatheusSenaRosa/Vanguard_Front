import * as yup from "yup";

export const schema = yup.object({
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
  confirmationPassword: yup
    .string()
    .required("Campo obrigatório")
    .test({
      message: "As senhas devem ser iguais",
      test: (value, context) => context.parent.password === value,
    }),
  token: yup
    .string()
    .required("Campo obrigatório")
    .test({
      message: "Deve conter 6 caracteres",
      test: (value) => {
        if (value) {
          const formattedValue = value.replaceAll("_", "");

          return formattedValue.length === 6;
        }

        return true;
      },
    })
    .length(6),
});
