import * as yup from "yup";

export const schema = yup.object({
  name: yup
    .string()
    .required("Campo obrigatório")
    .test({
      message: "Insira o nome completo",
      test: (value) => {
        if (!value || !value.trim()) return true;

        return value.trim().includes(" ");
      },
    }),
  occupationId: yup.string().required("Campo obrigatório").nullable(),
  isLocatedOutside: yup.boolean(),
  gitHub: yup.string().optional().nullable().url("URL inválida"),
  linkedIn: yup.string().optional().nullable().url("URL inválida"),
  gender: yup.string().nullable().required("Campo obrigatório"),
  countryId: yup
    .number()
    .nullable()
    .test({
      message: "Campo obrigatório",
      test: (value, ctx) => {
        const { isLocatedOutside } = ctx.parent;
        if (isLocatedOutside) {
          return Boolean(value);
        }
        return true;
      },
    }),
  stateId: yup
    .number()
    .nullable()
    .test({
      message: "Campo obrigatório",
      test: (value, ctx) => {
        const { isLocatedOutside } = ctx.parent;

        if (!isLocatedOutside) {
          return Boolean(value);
        }
        return true;
      },
    }),
  cityId: yup
    .number()
    .nullable()
    .test({
      message: "Campo obrigatório",
      test: (value, ctx) => {
        const { isLocatedOutside } = ctx.parent;

        if (!isLocatedOutside) {
          return Boolean(value);
        }
        return true;
      },
    }),
});
