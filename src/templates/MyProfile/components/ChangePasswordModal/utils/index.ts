import * as yup from "yup";

export const schema = yup.object({
  currentPassword: yup
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
  newPassword: yup
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
    })
    .test({
      message: "Não pode ser igual a senha atual",
      test: (value, context) => context.parent.currentPassword !== value,
    }),
  confirmationNewPassword: yup
    .string()
    .required("Campo obrigatório")
    .test({
      message: "As senhas devem ser iguais",
      test: (value, context) => context.parent.newPassword === value,
    }),
});
