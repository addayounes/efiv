import {
  type CreateComposition,
  ElementMaterielRoulantType,
} from "@/types/dto/create-circulation";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { cn } from "@/utils/cn";
import { Alert, Button } from "antd";
import type { SelectedState } from ".";
import { useFormikContext } from "formik";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import SortableElement from "@/components/sortable-element";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";

interface CreateCompositionPreviewProps {
  selected: SelectedState;
  setSelected: React.Dispatch<React.SetStateAction<SelectedState>>;
}

const CreateCompositionPreview: React.FC<CreateCompositionPreviewProps> = ({
  selected,
  setSelected,
}) => {
  const { values, errors, setFieldValue } =
    useFormikContext<CreateComposition>();

  const mrError = (errors.materielRoulant?.[0] as any)?.elementMaterielRoulant;

  const handleDeleteMaterielRoulant = (index: number) => {
    const updatedMaterielRoulant = [...values.materielRoulant].filter(
      (_, i) => i !== index
    );

    setFieldValue("materielRoulant", updatedMaterielRoulant);

    if (selected.train === index) setSelected({ car: -1, train: -1 });
  };

  const handleAddElementToMaterielRoulant = (mrIndex: number) => {
    const updatedMaterielRoulant = [...values.materielRoulant];
    updatedMaterielRoulant[mrIndex].elementMaterielRoulant.splice(
      updatedMaterielRoulant[mrIndex].elementMaterielRoulant.length - 1,
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
      car: updatedMaterielRoulant[mrIndex].elementMaterielRoulant.length - 2,
    });
  };

  const handleDeleteElementFromMaterielRoulant = (
    mrIndex: number,
    elIndex: number
  ) => {
    const updatedMaterielRoulant = [...values.materielRoulant];
    updatedMaterielRoulant[mrIndex].elementMaterielRoulant =
      updatedMaterielRoulant[mrIndex].elementMaterielRoulant.filter(
        (_, i) => i !== elIndex
      );

    setFieldValue("materielRoulant", updatedMaterielRoulant);

    setSelected({ train: mrIndex, car: -1 });
  };

  const onClickAddMaterielRoulant = () => {
    const newMaterielRoulant: CreateComposition["materielRoulant"][0] = {
      elementMaterielRoulant: [
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const updatedMaterielRoulant = [...values.materielRoulant];

      const [activeTrainIndex, activeCarIndex] = active.id
        ?.toString()
        .split("-")
        .map(Number);

      const [overTrainIndex, overCarIndex] = over.id
        ?.toString()
        .split("-")
        .map(Number);

      if (activeTrainIndex !== overTrainIndex) return;

      const oldIndex = updatedMaterielRoulant[
        activeTrainIndex
      ].elementMaterielRoulant.findIndex((c, idx) => idx === activeCarIndex);

      const newIndex = updatedMaterielRoulant[
        overTrainIndex
      ].elementMaterielRoulant.findIndex((c, idx) => idx === overCarIndex);

      if (
        newIndex === 0 ||
        newIndex ===
          updatedMaterielRoulant[activeTrainIndex].elementMaterielRoulant
            .length -
            1
      ) {
        // Prevent moving to head or tail position
        return;
      }

      const arrToUpdate =
        updatedMaterielRoulant[activeTrainIndex].elementMaterielRoulant;

      setFieldValue(
        `materielRoulant.${activeTrainIndex}.elementMaterielRoulant`,
        arrayMove(arrToUpdate, oldIndex, newIndex)
      );
    }
  };

  return (
    <div className="border border-gray-200 rounded p-4 bg-white h-full">
      <div className="flex items-center justify-between">
        <h2 className="font-medium text-lg">Aperçu de la composition</h2>
        <Button htmlType="button" onClick={onClickAddMaterielRoulant}>
          Ajouter un matériel roulant
        </Button>
      </div>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        {values.materielRoulant.length ? (
          <div className="flex items-center justify-center gap-2 py-5 w-full overflow-x-auto">
            <ArrowLeft className="-translate-y-4 text-primary" />
            {values.materielRoulant?.map((mr, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 items-center group/train"
                onClick={() => setSelected({ train: index, car: -1 })}
              >
                <div
                  className={cn(
                    "flex items-center gap-1 border p-6 rounded cursor-pointer group/innertrain",
                    selected.train === index
                      ? "bg-primary/5 border-primary"
                      : "hover:bg-primary/5 border-transparent"
                  )}
                >
                  <SortableContext
                    items={[...mr.elementMaterielRoulant].map(
                      (_, elIndex) => `${index}-${elIndex}`
                    )}
                    strategy={horizontalListSortingStrategy}
                  >
                    {mr.elementMaterielRoulant.map((el, elIndex) => {
                      const isHead = elIndex === 0;
                      const isTail =
                        elIndex === mr.elementMaterielRoulant.length - 1;
                      const lastVehicle =
                        elIndex === mr.elementMaterielRoulant.length - 2;

                      const isSelected =
                        selected.train === index && selected.car === elIndex;
                      return (
                        <div
                          key={elIndex}
                          className="relative flex items-center gap-1 group/car pt-4"
                        >
                          {!isHead && !isTail && (
                            <Trash2
                              size={16}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteElementFromMaterielRoulant(
                                  index,
                                  elIndex
                                );
                              }}
                              className={cn(
                                "absolute -top-1 hidden group-hover/car:block text-red-500",
                                lastVehicle
                                  ? "left-7"
                                  : "left-1/2 -translate-x-1/2"
                              )}
                            />
                          )}
                          <SortableElement
                            id={`${index}-${elIndex}`}
                            disabled={isHead || isTail}
                          >
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelected({ train: index, car: elIndex });
                              }}
                              className={cn(
                                "flex items-center justify-center w-18 h-10 cursor-pointer overflow-hidden",
                                isHead
                                  ? "bg-primary text-white relative rounded-tl-[44px] rounded-bl-2xl"
                                  : isTail
                                  ? "bg-primary text-white relative rounded-tr-[44px] rounded-br-2xl"
                                  : "border-3 bg-primary/15 hover:bg-primary/30",
                                isSelected
                                  ? isHead || isTail
                                    ? "ring-2 ring-primary ring-offset-2 ring-offset-[#F2F5F7]"
                                    : "border-primary"
                                  : "border-transparent"
                              )}
                            >
                              <p className="font-medium">{el.libelle}</p>

                              {(isHead || isTail) && (
                                <span
                                  className={cn(
                                    "absolute w-2 h-5 rounded-full z-50",
                                    isHead
                                      ? "rotate-[43deg] left-[4.5px] top-0"
                                      : isTail
                                      ? "rotate-[-43deg] right-[4.5px] top-0"
                                      : "",
                                    selected.train === index
                                      ? "bg-[#F2F5F7]"
                                      : "bg-white group-hover/innertrain:bg-[#F2F5F7]"
                                  )}
                                />
                              )}
                            </button>
                          </SortableElement>

                          {lastVehicle && (
                            <button
                              type="button"
                              key="add-more"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddElementToMaterielRoulant(index);
                              }}
                              className={cn(
                                "flex items-center justify-center border-3 w-10 h-10 cursor-pointer text-primary border-primary hover:bg-primary/5"
                              )}
                            >
                              <Plus size={16} />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </SortableContext>
                </div>

                <div>
                  <Trash2
                    size={20}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteMaterielRoulant(index);
                    }}
                    className="text-red-500 cursor-pointer opacity-0 group-hover/train:opacity-100"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full py-12">
            <p className="text-gray-500">Aucun matériel roulant ajouté</p>
          </div>
        )}
      </DndContext>

      {typeof mrError === "string" && <Alert type="error" message={mrError} />}
    </div>
  );
};

export default CreateCompositionPreview;
