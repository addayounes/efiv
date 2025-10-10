import { Button } from "antd";
import { defaultStop } from "../form";
import { useFormikContext } from "formik";
import StationCard from "./components/station-card";
import InfoConjConfig from "./components/info-conj";
import FormGroupTitle from "../../../../components/group-title";
import type { CreateCirculationDto } from "../../../../types/dto/create-circulation";

interface RouteStepProps {}

const RouteStep: React.FC<RouteStepProps> = ({}) => {
  return (
    <div className="flex h-full">
      <div className="w-2/3 p-4 space-y-10 border-r border-gray-200">
        {/* <CompositionConfig /> */}
        <InfoConjConfig />
        <RoutesConfig />
      </div>
      <div className="w-1/3 p-4 overflow-y-auto"></div>
    </div>
  );
};

const RoutesConfig: React.FC<RouteStepProps> = ({}) => {
  const { values, setFieldValue } = useFormikContext<CreateCirculationDto>();

  const handleAddStop = () => {
    if ((values.parcours?.length ?? 0) < 2)
      setFieldValue("parcours", [defaultStop, ...(values.parcours || [])]);
    else {
      const _parcours = [...values.parcours];
      _parcours.splice(_parcours.length - 1, 0, defaultStop);
      setFieldValue("parcours", _parcours);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <FormGroupTitle>
          Dessertes ({values.parcours?.length ?? 0})
        </FormGroupTitle>
        <Button onClick={handleAddStop} htmlType="button" type="primary">
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
