import {
  type CreateComposition,
  ElementMaterielRoulantType,
} from "@/types/dto/create-circulation";
import toast from "react-hot-toast";
import { Button, Dropdown } from "antd";
import type { MenuProps } from "antd/lib";
import { useFormikContext } from "formik";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import CompositionPreview from "@/components/composition-preview";
import { getAllCompositionsService } from "@/services/composition";

interface SelectExistingTrainProps {}

const SelectExistingTrain: React.FC<SelectExistingTrainProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const [rawCompositions, setRawCompositions] = useState<CreateComposition[]>(
    [],
  );
  const [availableTrains, setAvailableTrains] = useState<MenuProps["items"]>(
    [],
  );

  const { setFieldValue, values } = useFormikContext<CreateComposition>();

  const handleTrainClick = async (key: string) => {
    const [compoIndex, mrIndex] = key.split("-").map(Number);

    const targetTrain = rawCompositions[compoIndex]?.materielRoulant[mrIndex];

    if (!targetTrain) {
      toast.error("Le materiel roulant n'a pas été trouvé");
      return;
    }

    const newMaterielRoulant = {
      ...targetTrain,
      elementMaterielRoulant: targetTrain.elementMaterielRoulant.map(
        (emr, emrIndex, targetTrainElements) => ({
          ...emr,
          type:
            emrIndex === 0
              ? ElementMaterielRoulantType.Head
              : emrIndex === targetTrainElements.length - 1
                ? ElementMaterielRoulantType.Tail
                : ElementMaterielRoulantType.Vehicle,
        }),
      ),
    };

    setFieldValue("materielRoulant", [
      ...values?.materielRoulant,
      newMaterielRoulant,
    ]);
  };

  useEffect(() => {
    const fetchAvailableTrains = async () => {
      try {
        setLoading(true);
        const data = await getAllCompositionsService();

        setRawCompositions(data);

        const mappedTrains = data.flatMap((compo, compoIndex) =>
          compo.materielRoulant.flatMap((mr, mrIndex) => [
            {
              key: `${compoIndex}-${mrIndex}`,
              label: (
                <div className="py-2">
                  <CompositionPreview composition={{ materielRoulant: [mr] }} />
                </div>
              ),
            },
          ]),
        );

        setAvailableTrains(mappedTrains);
      } catch (error) {
        console.log("Failed to fetch compositions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableTrains();
  }, []);

  return (
    <Dropdown
      menu={{
        items: availableTrains,
        style: { maxHeight: "300px" },
        onClick: (info) => handleTrainClick(info.key),
      }}
      trigger={["click"]}
    >
      <Button loading={loading} htmlType="button">
        <ChevronDown className="text-gray-500 mt-0.5" size={18} />
        Réutiliser un materiel existant
      </Button>
    </Dropdown>
  );
};

export default SelectExistingTrain;
