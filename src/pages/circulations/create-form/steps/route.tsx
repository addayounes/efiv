import { Button } from "antd";
import { useFormikContext } from "formik";
import StationCard from "./components/station-card";
import FormGroupTitle from "../../../../components/group-title";
import type { CreateCirculationDto } from "../../../../types/dto/create-circulation";

interface RouteStepProps {}

const RouteStep: React.FC<RouteStepProps> = ({}) => {
  return (
    <div className="flex h-full">
      <div className="flex-2/3 p-4 space-y-6 border-r border-gray-200">
        {/* <CompositionConfig /> */}
        <RoutesConfig />
      </div>
      <div className="flex-1/3 p-4 overflow-y-auto"></div>
    </div>
  );
};

const RoutesConfig: React.FC<RouteStepProps> = ({}) => {
  const { values, setFieldValue } = useFormikContext<CreateCirculationDto>();

  const handleAddStop = () => {
    setFieldValue("parcours", [
      { uic: undefined, arrival: undefined, departure: undefined },
      ...(values.parcours || []),
    ]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <FormGroupTitle>Dessertes</FormGroupTitle>
        <Button onClick={handleAddStop} htmlType="button">
          Ajouter une desserte
        </Button>
      </div>
      <div className="space-y-2">
        {values.parcours?.length
          ? values.parcours?.map((_, index) => (
              <StationCard key={index} index={index} />
            ))
          : null}
      </div>
    </div>
  );
};

const CompositionConfig: React.FC<RouteStepProps> = ({}) => {
  return (
    <div>
      <FormGroupTitle>Composition</FormGroupTitle>
    </div>
  );
};

export default RouteStep;
