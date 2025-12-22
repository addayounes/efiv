import {
  isStepValid,
  getStepIndex,
  CreateCirculationSteps,
} from "@/constants/create-form-steps";
import { useEffect, useMemo } from "react";
import { Steps, type StepProps } from "antd";
import { __routes__ } from "@/constants/routes";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface CirculationFormStepperProps {
  steps: StepProps[];
}

const CirculationFormStepper: React.FC<CirculationFormStepperProps> = ({
  steps,
}) => {
  const { step } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const currentStep = useMemo(
    () => getStepIndex(step as CreateCirculationSteps),
    [step]
  );

  // reset to first step if step param is invalid
  useEffect(() => {
    if (isStepValid(step as CreateCirculationSteps)) return;

    navigate(
      __routes__.Circulations.Create.replace(
        ":step",
        CreateCirculationSteps.GENERAL
      ),
      { state }
    );
  }, [step]);

  return (
    <div className="pt-6 pb-8">
      <Steps items={steps} current={currentStep} />
    </div>
  );
};

export default CirculationFormStepper;
