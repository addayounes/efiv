import DateStep from "./steps/date";
import RouteStep from "./steps/route";
import SummaryStep from "./steps/summary";
import GeneralStep from "./steps/general";
import { CreateCirculationSteps } from "@/constants/create-form-steps";

interface FormContentRendererProps {
  step: CreateCirculationSteps;
}

const CONTENT_MAP: Record<CreateCirculationSteps, React.JSX.Element> = {
  [CreateCirculationSteps.GENERAL]: <GeneralStep />,
  [CreateCirculationSteps.ROUTE]: <RouteStep />,
  [CreateCirculationSteps.DATE]: <DateStep />,
  [CreateCirculationSteps.SUMMARY]: <SummaryStep />,
};

const FormContentRenderer: React.FC<FormContentRendererProps> = ({ step }) => {
  return CONTENT_MAP[step] || null;
};

export default FormContentRenderer;
