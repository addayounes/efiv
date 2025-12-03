import type {
  DbComposition,
  CreateCirculationDto,
} from "@/types/dto/create-circulation";
import { Button } from "antd";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Select from "@/components/formik/select";
import { Field, useFormikContext } from "formik";
import CompositionPreview from "@/components/composition-preview";
import { getAllCompositionsService } from "@/services/composition";

interface CompositionConfigContentProps {
  index: number;
}

const CompositionConfigContent: React.FC<CompositionConfigContentProps> = ({
  index,
}) => {
  const [loading, setLoading] = useState(false);
  const [compositions, setCompositions] = useState<DbComposition[]>([]);
  const { values, setFieldValue } = useFormikContext<CreateCirculationDto>();

  const currentStop = values.parcours[index];

  const compositionsOptions = compositions.map((composition) => ({
    label: composition.name,
    value: composition._id,
    title: composition,
  }));

  const selectedComposition = compositions.find(
    (comp) => comp._id === currentStop?.composition?.value
  );

  const handleApplyToFollowingStops = () => {
    const updatedParcours = [...values.parcours].map((stop, i) => {
      if (i <= index) return stop;
      return { ...stop, composition: currentStop?.composition };
    });
    setFieldValue("parcours", updatedParcours);
  };

  useEffect(() => {
    const fetchCompositions = async () => {
      try {
        setLoading(true);
        const data = await getAllCompositionsService();
        setCompositions((data ?? []) as DbComposition[]);
      } catch (error) {
        toast.error("Erreur lors du chargement des compositions");
      } finally {
        setLoading(false);
      }
    };

    fetchCompositions();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <Field
          allowClear
          as={Select}
          labelInValue
          size="medium"
          loading={loading}
          label="Composition"
          className="min-w-[360px]"
          options={compositionsOptions}
          name={`parcours.${index}.composition`}
          placeholder="Selectionner une composition"
        />

        <Button
          size="small"
          type="dashed"
          htmlType="button"
          onClick={handleApplyToFollowingStops}
          disabled={index == values.parcours.length - 1}
        >
          Appliquer sur les arrêts suivants
        </Button>
      </div>

      <div className="pt-8 overflow-x-auto w-[calc(100vw-1000px)] mx-auto">
        {selectedComposition ? (
          <CompositionPreview
            size="medium"
            showDetails
            composition={selectedComposition}
          />
        ) : (
          <p className="flex items-center justify-center text-gray-500">
            Aucune composition selectionnée
          </p>
        )}
      </div>
    </div>
  );
};

export default CompositionConfigContent;
