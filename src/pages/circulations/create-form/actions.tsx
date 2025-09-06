import {
  getNextStep,
  getPreviousStep,
  CreateCirculationSteps,
} from "../../../constants/create-form-steps";
import { Button } from "antd";
import { __routes__ } from "../../../constants/routes";
import { useNavigate, useParams } from "react-router-dom";

interface FormActionsProps {}

const FormActions: React.FC<FormActionsProps> = ({}) => {
  const { step } = useParams();
  const navigate = useNavigate();

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

  const onNext = () => {
    const nextStep = getNextStep(step as CreateCirculationSteps);
    console.log(nextStep);
    if (!nextStep) return;
    navigate(__routes__.Circulations.Create.replace(":step", nextStep));
  };

  return (
    <div className="flex items-center justify-between">
      <Button
        type="default"
        htmlType="button"
        onClick={isFirstStep ? onCancel : onPrevious}
      >
        {isFirstStep ? "Annuler" : "Précédent"}
      </Button>

      <Button
        type="primary"
        onClick={isLastStep ? undefined : onNext}
        htmlType={isLastStep ? "submit" : "button"}
      >
        {isLastStep ? "Terminer" : "Suivant"}
      </Button>
    </div>
  );
};

export default FormActions;
