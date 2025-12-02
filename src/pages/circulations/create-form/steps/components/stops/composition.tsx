import type {
  CreateComposition,
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

interface DbComposition extends CreateComposition {
  _id: string;
}

const CompositionConfigContent: React.FC<CompositionConfigContentProps> = ({
  index,
}) => {
  const [loading, setLoading] = useState(false);
  const [compositions, setCompositions] = useState<DbComposition[]>([]);

  const { values } = useFormikContext<CreateCirculationDto>();

  const compositionsOptions = compositions.map((composition) => ({
    label: composition.name,
    value: composition._id,
  }));

  const selectedComposition = compositions.find(
    (comp) => comp._id === values?.compositionId
  );

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
          size="medium"
          loading={loading}
          label="Composition"
          name="compositionId"
          className="min-w-[360px]"
          options={compositionsOptions}
          placeholder="Selectionner une composition"
        />

        <Button
          disabled={index == values.parcours.length - 1}
          type="dashed"
          size="small"
          htmlType="button"
        >
          Appliquer la composition sur les arrêts suivants
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
