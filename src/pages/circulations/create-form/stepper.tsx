import {
  isStepValid,
  getStepIndex,
  CreateCirculationSteps,
} from "../../../constants/create-form-steps";
import { useEffect, useMemo } from "react";
import { Steps, type StepProps } from "antd";
import { __routes__ } from "../../../constants/routes";
import { useNavigate, useParams } from "react-router-dom";
import type { StateSetter } from "../../../types/state-setter";

interface CirculationFormStepperProps {
  steps: StepProps[];
  setSteps: StateSetter<StepProps[]>;
}

const CirculationFormStepper: React.FC<CirculationFormStepperProps> = ({
  steps,
  setSteps,
}) => {
  const { step } = useParams();
  const navigate = useNavigate();

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
      )
    );
  }, [step]);

  return (
    <div className="pt-6 pb-8">
      <Steps items={steps} current={currentStep} />
    </div>
  );
};

export default CirculationFormStepper;
