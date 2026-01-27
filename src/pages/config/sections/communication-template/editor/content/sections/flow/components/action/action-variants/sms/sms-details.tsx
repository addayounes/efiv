import type {
  Stage,
  Action,
  SMSActionDetails,
} from "@/types/entity/communication";
import { Button } from "antd";
import { Field } from "formik";
import { useAppDispatch } from "@/redux/utils";
import FormikForm from "@/components/formik/form";
import TextArea from "@/components/formik/textarea";
import { setSelectedStage, updateAction } from "@/redux/slices/communication";

interface ActionSMSVariantDetailsProps {
  stage: Stage;
  action: Action;
}

const ActionSMSVariantDetails: React.FC<ActionSMSVariantDetailsProps> = ({
  action,
  stage,
}) => {
  const dispatch = useAppDispatch();

  const initialValues: SMSActionDetails = {
    body: (action.details as SMSActionDetails)?.body ?? "",
  };

  const handleSubmitForm = (values: SMSActionDetails) => {
    dispatch(
      updateAction({
        stageId: stage.id,
        actionId: action.id,
        data: { ...values },
      }),
    );
    dispatch(setSelectedStage(undefined));
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

              <div className="flex justify-end mt-10">
                <Button htmlType="submit" type="primary">
                  Enregistrer
                </Button>
              </div>
            </div>
          );
        }}
      </FormikForm>
    </div>
  );
};

export default ActionSMSVariantDetails;
