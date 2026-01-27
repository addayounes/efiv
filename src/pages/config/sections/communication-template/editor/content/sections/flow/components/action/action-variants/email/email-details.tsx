import { Field } from "formik";
import FormikForm from "@/components/formik/form";
import TextArea from "@/components/formik/textarea";
import TextField from "@/components/formik/textfield";
import type { Action } from "@/types/entity/communication";

interface ActionEmailVariantDetailsProps {
  action: Action;
}

const ActionEmailVariantDetails: React.FC<
  ActionEmailVariantDetailsProps
> = ({}) => {
  const initialValues = {};

  const handleSubmitForm = (values: typeof initialValues) => {
    console.log(values);
  };

  return (
    <div>
      <FormikForm initialValues={initialValues} onSubmit={handleSubmitForm}>
        {() => {
          return (
            <div className="space-y-4">
              <Field
                name="subject"
                as={TextField}
                label="Sujet"
                placeholder="Sujet d'email"
              />
              <Field
                rows={10}
                name="body"
                as={TextArea}
                label="Contenu"
                placeholder="Contenu d'email"
              />
            </div>
          );
        }}
      </FormikForm>
    </div>
  );
};

export default ActionEmailVariantDetails;
