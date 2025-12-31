import * as Yup from "yup";

export const motifSchema = Yup.object({
  externe: Yup.string().required("Le motif externe est requis"),
  interne: Yup.string().required("Le motif interne est requis"),
});
