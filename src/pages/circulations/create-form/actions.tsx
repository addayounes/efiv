import { flattenErrors, buildNestedTouched } from "@/utils/formik-helpers";
import {
  getNextStep,
  getPreviousStep,
  CreateCirculationSteps,
} from "@/constants/create-form-steps";
import { Button } from "antd";
import { useFormikContext } from "formik";
import { __routes__ } from "@/constants/routes";
import { useNavigate, useParams } from "react-router-dom";
import type { CreateCirculationDto } from "@/types/dto/create-circulation";
import { FieldsToValidateByStep } from "@/validation/create-circulation.validation";

interface FormActionsProps {}

const FormActions: React.FC<FormActionsProps> = ({}) => {
  const { step } = useParams();
  const navigate = useNavigate();
  const { validateForm, setTouched, isSubmitting } =
    useFormikContext<CreateCirculationDto>();

  const isFirstStep = step === CreateCirculationSteps.GENERAL;
  const isLastStep = step === CreateCirculationSteps.SUMMARY;

  const onPrevious = () => {
    const prevStep = getPreviousStep(step as CreateCirculationSteps);
    if (!prevStep) return;
    navigate(__routes__.Circulations.Create.replace(":step", prevStep));
  };

  const onCancel = () => {
    navigate(__routes__.Circulations.Main);
  };

  const onNext = async () => {
    const isStepValid = await validateStep();

    if (!isStepValid) return;

    const nextStep = getNextStep(step as CreateCirculationSteps);
    if (!nextStep) return;
    navigate(__routes__.Circulations.Create.replace(":step", nextStep));
  };

  const validateStep = async () => {
    const errors = await validateForm();

    const fieldsToValidate =
      FieldsToValidateByStep[step as CreateCirculationSteps];

    const flattenedErrors = flattenErrors(errors);

    const stepErrors = flattenedErrors.filter((errPath) =>
      fieldsToValidate.some((field) => errPath.startsWith(field))
    );

    if (stepErrors.length > 0) {
      const nestedTouched = buildNestedTouched(stepErrors);
      setTouched(nestedTouched, true);
      return false;
    }

    return true;
  };

  return (
    <div className="flex items-center justify-between">
      <Button
        type="default"
        htmlType="button"
        disabled={isSubmitting}
        onClick={isFirstStep ? onCancel : onPrevious}
      >
        {isFirstStep ? "Annuler" : "Précédent"}
      </Button>

      <div className="flex items-center gap-4">
        <Button
          type="default"
          htmlType="button"
          disabled={isSubmitting}
          onClick={isFirstStep ? onCancel : onPrevious}
        >
          Enregistrer en brouillon
        </Button>

        <Button
          type="primary"
          loading={isSubmitting}
          onClick={isLastStep ? undefined : onNext}
          htmlType={isLastStep ? "submit" : "button"}
        >
          {isLastStep ? "Terminer" : "Suivant"}
        </Button>
      </div>
    </div>
  );
};

export default FormActions;
