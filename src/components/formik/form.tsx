import type {
  FormikConfig,
  FormikValues,
  FormikHelpers,
  FormikProps,
} from "formik";
import toast from "react-hot-toast";
import { Formik, Form } from "formik";

interface FormikFormProps<T> extends FormikConfig<T> {
  children: (props: FormikProps<T>) => React.ReactNode;
  withLoadingToast?: boolean;
}

function FormikForm<T extends FormikValues>(props: FormikFormProps<T>) {
  const { children: Children, onSubmit, withLoadingToast } = props;

  const handleSubmit = async (values: T, formikHelpers: FormikHelpers<T>) => {
    try {
      formikHelpers.setSubmitting(true);
      withLoadingToast && toast.loading("Envoi en cours...", { id: "loading" });
      await onSubmit?.(values, formikHelpers);
    } catch (error) {
      toast.error("Une erreur est survenue.");
      console.error("Error submitting form:", error);
    } finally {
      formikHelpers.setSubmitting(false);
      withLoadingToast && toast.dismiss("loading");
    }
  };

  return (
    <Formik enableReinitialize {...props} onSubmit={handleSubmit}>
      {(computedProps) => {
        return (
          <Form>
            <Children {...computedProps} />
          </Form>
        );
      }}
    </Formik>
  );
}

export default FormikForm;
