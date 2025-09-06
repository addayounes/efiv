import {
  CreateCirculationSteps,
  CREATE_CIRCULATION_FORM_STEPS_KEYS,
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
    () => CREATE_CIRCULATION_FORM_STEPS_KEYS.findIndex((s) => s === step),
    [step]
  );

  // reset to first step if step param is invalid
  useEffect(() => {
    if (
      CREATE_CIRCULATION_FORM_STEPS_KEYS.includes(
        step as CreateCirculationSteps
      )
    )
      return;

    navigate(
      __routes__.Circulations.Create.replace(
        ":step",
        CreateCirculationSteps.GENERAL
      )
    );
  }, [step]);

  return (
    <div>
      <Steps items={steps} current={currentStep} />
    </div>
  );
};

export default CirculationFormStepper;
