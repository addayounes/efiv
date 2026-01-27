import type {
  Stage,
  Action,
  EmailActionDetails,
} from "@/types/entity/communication";
import { Button } from "antd";
import { Field } from "formik";
import { useMemo } from "react";
import { useAppDispatch } from "@/redux/utils";
import FormikForm from "@/components/formik/form";
import TextArea from "@/components/formik/textarea";
import TextField from "@/components/formik/textfield";
import { setSelectedStage, updateAction } from "@/redux/slices/communication";

interface ActionEmailVariantDetailsProps {
  stage: Stage;
  action: Action;
}

const ActionEmailVariantDetails: React.FC<ActionEmailVariantDetailsProps> = ({
  action,
  stage,
}) => {
  const dispatch = useAppDispatch();

  const initialValues: EmailActionDetails = useMemo(() => {
    const details = action?.details as EmailActionDetails;
    return {
      body: details?.body ?? "",
      subject: details?.subject ?? "",
    };
  }, [action]);

  const handleSubmitForm = (values: EmailActionDetails) => {
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
    <FormikForm
      initialValues={initialValues}
      onSubmit={handleSubmitForm}
      enableReinitialize
    >
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

            <div className="flex justify-end mt-10">
              <Button htmlType="submit" type="primary">
                Enregistrer
              </Button>
            </div>
          </div>
        );
      }}
    </FormikForm>
  );
};

export default ActionEmailVariantDetails;
