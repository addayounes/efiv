import { Field } from "formik";
import FormikForm from "@/components/formik/form";
import TextArea from "@/components/formik/textarea";
import type { Action, SMSActionDetails } from "@/types/entity/communication";

interface ActionSMSVariantDetailsProps {
  action: Action;
}

const ActionSMSVariantDetails: React.FC<
  ActionSMSVariantDetailsProps
> = ({}) => {
  const initialValues: SMSActionDetails = {
    body: "",
  };

  const handleSubmitForm = (values: SMSActionDetails) => {
    console.log(values);
  };

  return (
    <div>
      <FormikForm initialValues={initialValues} onSubmit={handleSubmitForm}>
        {() => {
          return (
            <div className="space-y-4">
              <Field
                rows={10}
                name="body"
                as={TextArea}
                label="Message"
                placeholder="Contenu du message"
              />
            </div>
          );
        }}
      </FormikForm>
    </div>
  );
};

export default ActionSMSVariantDetails;
