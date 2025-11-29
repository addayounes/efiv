import type {
  CreateCirculationDto,
  CreateComposition,
} from "@/types/dto/create-circulation";
import { Button, Tabs } from "antd";
import { defaultStop } from "../form";
import StopsLine from "@/components/stops";
import { useEffect, useState } from "react";
import Select from "@/components/formik/select";
import { Field, useFormikContext } from "formik";
import StationCard from "./components/station-card";
import InfoConjConfig from "./components/info-conj";
import FormGroupTitle from "@/components/group-title";
import CreateCouplageTab from "./components/couplage";
import CompositionPreview from "@/components/composition-preview";
import { getAllCompositionsService } from "@/services/composition";

interface RouteStepProps {}

const RouteStep: React.FC<RouteStepProps> = ({}) => {
  const { values } = useFormikContext<CreateCirculationDto>();
  return (
    <div className="h-full p-4 pt-2">
      <Tabs className="h-full">
        <Tabs.TabPane
          key="stops"
          tab={<p className="font-medium">Dessertes</p>}
        >
          <div className="flex h-full">
            <div className="w-2/3 pr-4 space-y-10 border-r border-gray-200">
              <RoutesConfig />
            </div>
            <div className="w-1/3">
              <StopsLine stops={values.parcours ?? []} />
            </div>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane
          key="info-conj"
          tab={<p className="font-medium">Informations conjoncturelles</p>}
        >
          <div className="w-[99%]">
            <InfoConjConfig />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane
          key="composition-outer"
          tab={<p className="font-medium">Composition</p>}
        >
          <CompositionConfig />
        </Tabs.TabPane>
        <Tabs.TabPane
          key="couplage"
          tab={<p className="font-medium">Couplage</p>}
        >
          <CreateCouplageTab />
        </Tabs.TabPane>
      </Tabs>
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

interface DbComposition extends CreateComposition {
  id: string;
}

const CompositionConfig: React.FC<RouteStepProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const [compositions, setCompositions] = useState<DbComposition[]>([]);

  const compositionsOptions = compositions.map((composition) => ({
    label: (
      <div className="flex items-center justify-between gap-4">
        <p>{composition.name}</p>
        <CompositionPreview composition={composition} />
      </div>
    ),
    value: composition.id,
  }));

  useEffect(() => {
    const fetchCompositions = async () => {
      try {
        setLoading(true);
        const data = await getAllCompositionsService();
        setCompositions((data ?? []) as DbComposition[]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompositions();
  }, []);

  return (
    <div>
      <FormGroupTitle>Composition</FormGroupTitle>
      <div className="mt-4">
        <Field
          as={Select}
          loading={loading}
          className="w-full"
          name="composition"
          label="Composition"
          options={compositionsOptions}
          placeholder="Selectionner une composition"
        />
      </div>
    </div>
  );
};

export default RouteStep;
