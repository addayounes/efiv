import {
  type Composition,
  ElementMaterielRoulantType,
} from "@/types/dto/create-circulation";
import { Button } from "antd";
import { cn } from "@/utils/cn";
import type { SelectedState } from ".";
import { useFormikContext } from "formik";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

interface CreateCompositionPreviewProps {
  selected: SelectedState;
  setSelected: React.Dispatch<React.SetStateAction<SelectedState>>;
}

const CreateCompositionPreview: React.FC<CreateCompositionPreviewProps> = ({
  selected,
  setSelected,
}) => {
  const { values, setFieldValue } = useFormikContext<Composition>();

  const onClickAddMaterielRoulant = () => {
    const newMaterielRoulant: Composition["materielRoulant"][0] = {
      elementMaterielRoulantAsync: [
        { longueur: 0, porte: [], type: ElementMaterielRoulantType.Head },
        { longueur: 0, porte: [], type: ElementMaterielRoulantType.Tail },
      ],
      serie: "",
      sousSerie: "",
      sousSerie2: "",
    };
    setFieldValue("materielRoulant", [
      ...values.materielRoulant,
      newMaterielRoulant,
    ]);

    setSelected({ car: 0, train: values.materielRoulant.length });
  };

  const handleDeleteMaterielRoulant = (index: number) => {
    const updatedMaterielRoulant = values.materielRoulant.filter(
      (_, i) => i !== index
    );
    setFieldValue("materielRoulant", updatedMaterielRoulant);

    if (selected.train === index) setSelected({ car: -1, train: -1 });
  };

  const handleAddElementToMaterielRoulant = (mrIndex: number) => {
    const updatedMaterielRoulant = [...values.materielRoulant];
    updatedMaterielRoulant[mrIndex].elementMaterielRoulantAsync.splice(
      updatedMaterielRoulant[mrIndex].elementMaterielRoulantAsync.length - 1,
      0,
      {
        porte: [],
        longueur: 0,
        libelle: "",
        type: ElementMaterielRoulantType.Vehicle,
      }
    );
    setFieldValue("materielRoulant", updatedMaterielRoulant);

    setSelected({
      train: mrIndex,
      car:
        updatedMaterielRoulant[mrIndex].elementMaterielRoulantAsync.length - 2,
    });
  };

  console.log(selected);

  return (
    <div className="border border-gray-200 rounded p-6 bg-white w-[calc(100vw-104px)]">
      <div className="flex justify-end">
        <Button htmlType="button" onClick={onClickAddMaterielRoulant}>
          Ajouter un matériel roulant
        </Button>
      </div>

      <div className="flex items-center justify-center gap-6 py-10 w-full overflow-x-auto">
        <ArrowLeft className="-translate-y-4 text-primary" />
        {values.materielRoulant?.map((mr, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 items-center group"
            onClick={() => setSelected({ train: index, car: -1 })}
          >
            <div
              className={cn(
                "flex items-center gap-1 border p-6 rounded cursor-pointer",
                selected.train === index
                  ? "bg-primary/5 border-primary"
                  : "hover:bg-primary/5 border-transparent"
              )}
            >
              {mr.elementMaterielRoulantAsync.map((el, elIndex) => {
                const isHead = elIndex === 0;
                const isTail =
                  elIndex === mr.elementMaterielRoulantAsync.length - 1;
                const lastVehicle =
                  elIndex === mr.elementMaterielRoulantAsync.length - 2;
                return (
                  <div key={elIndex} className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected({ train: index, car: elIndex });
                      }}
                      className={cn(
                        "flex items-center justify-center ring-2 ring-offset-1 w-16 h-7 cursor-pointer",
                        isHead
                          ? "bg-primary hover:brightness-80 text-white relative rounded-tl-[44px] rounded-bl-2xl"
                          : isTail
                          ? "bg-primary hover:brightness-80 text-white relative rounded-tr-[44px] rounded-br-2xl"
                          : "bg-primary/15 hover:bg-primary/30",
                        selected.train === index && selected.car === elIndex
                          ? "ring-primary"
                          : "ring-transparent"
                      )}
                    >
                      <p className="font-medium">{el.libelle}</p>
                    </button>

                    {lastVehicle && (
                      <button
                        type="button"
                        key="add-more"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddElementToMaterielRoulant(index);
                        }}
                        className={cn(
                          "flex items-center justify-center ring-2 ring-transparent w-7 h-7 cursor-pointer border text-primary border-primary hover:bg-primary/5"
                        )}
                      >
                        <Plus size={16} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <div>
              <Trash2
                size={20}
                onClick={() => handleDeleteMaterielRoulant(index)}
                className="text-red-500 cursor-pointer opacity-0 group-hover:opacity-100"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateCompositionPreview;
