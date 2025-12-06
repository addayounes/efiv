import { Button } from "antd";
import { cn } from "@/utils/cn";
import Switch from "@/components/formik/switch";
import { Field, useFormikContext } from "formik";
import { ArrowLeft, Trash2 } from "lucide-react";
import type { ICirculation } from "@/types/entity/circulation";
import { CompositionCar } from "@/components/composition-preview";
import NoPassengersIcon from "@/components/icons/no-passenger-icon";

interface UpdateContentCompositionTabProps {
  index: number;
}

const UpdateContentCompositionTab: React.FC<
  UpdateContentCompositionTabProps
> = ({ index }) => {
  const { values, setFieldValue } = useFormikContext<ICirculation>();

  const compositionPlace =
    index === values.parcours.pointDeParcours.length - 1 ? "arrivee" : "depart";

  const stopComposition =
    values.parcours.pointDeParcours?.[index]?.arret?.[compositionPlace]
      ?.composition;

  // const stopComposition =
  //   values.parcours.pointDeParcours?.[index]?.arret?.depart
  //     ?.referenceIdComposition;

  //   const selectedComposition = stopComposition?.length
  //     ? (values.compositions ?? []).find(
  //         (c) => c.generatedId === stopComposition
  //       )?.composition!
  //     : null;

  const handleApplyToFollowingStops = () => {
    const updatedParcours = [...values.parcours.pointDeParcours].map(
      (stop, i) => {
        if (i <= index) return stop;
        return {
          ...stop,
          arret: {
            ...stop.arret,
            depart: stop?.arret?.depart
              ? {
                  ...stop?.arret?.depart,
                  composition: stopComposition,
                }
              : stop?.arret?.depart,
            arrivee: stop?.arret?.arrivee
              ? {
                  ...stop?.arret?.arrivee,
                  composition: stopComposition,
                }
              : stop?.arret?.arrivee,
          },
        };
      }
    );

    setFieldValue("parcours.pointDeParcours", updatedParcours);
  };

  const handleDeleteMaterielRoulant = (mrIndex: number) => {
    if (!stopComposition) return;

    const updatedMaterielRoulant = [...stopComposition.materielRoulant].filter(
      (_, i) => i !== mrIndex
    );

    setFieldValue(
      `parcours.pointDeParcours.${index}.arret.${compositionPlace}.composition.materielRoulant`,
      updatedMaterielRoulant
    );
  };

  const handleDeleteElementFromMaterielRoulant = (
    mrIndex: number,
    elIndex: number
  ) => {
    if (!stopComposition) return;

    const updatedMaterielRoulant = [...stopComposition.materielRoulant];
    updatedMaterielRoulant[mrIndex].elementMaterielRoulant =
      updatedMaterielRoulant[mrIndex].elementMaterielRoulant.filter(
        (_, i) => i !== elIndex
      );

    setFieldValue(
      `parcours.pointDeParcours.${index}.arret.${compositionPlace}.composition.materielRoulant`,
      updatedMaterielRoulant
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-lg font-medium">Composition</h2>
        </div>
        <Button
          size="small"
          type="dashed"
          htmlType="button"
          onClick={handleApplyToFollowingStops}
          disabled={
            index == values.parcours.pointDeParcours.length - 1 ||
            !stopComposition
          }
        >
          Appliquer sur les arrêts suivants
        </Button>
      </div>

      <div className="py-16 px-10 overflow-x-auto w-[calc(100vw-650px)] mx-auto">
        {stopComposition ? (
          stopComposition.materielRoulant.length ? (
            <div className="flex gap-4 items-center">
              <div>
                <ArrowLeft size={30} className="text-primary -translate-y-2" />
              </div>
              {stopComposition.materielRoulant.map((mr, mrIndex) => {
                const isOpenToPassengers =
                  typeof mr.ouvertAuxVoyageurs === "boolean" &&
                  mr.ouvertAuxVoyageurs;
                return (
                  <div
                    key={mrIndex}
                    className="flex flex-col gap-4 items-center relative"
                  >
                    <div
                      className={cn("flex items-center gap-1", {
                        "grayscale-100 opacity-70": !isOpenToPassengers,
                      })}
                    >
                      {mr.elementMaterielRoulant.map((el, elIndex) => {
                        const isHead = elIndex === 0;
                        const isTail =
                          elIndex === mr.elementMaterielRoulant.length - 1;
                        return (
                          <div className="group/car relative pt-4">
                            {isOpenToPassengers && !isHead && !isTail && (
                              <Trash2
                                size={16}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteElementFromMaterielRoulant(
                                    mrIndex,
                                    elIndex
                                  );
                                }}
                                className="absolute -top-1 hidden group-hover/car:block text-red-500 left-1/2 -translate-x-1/2 cursor-pointer"
                              />
                            )}

                            <CompositionCar
                              data={el}
                              size="large"
                              key={elIndex}
                              isTail={isTail}
                              isHead={isHead}
                            />
                          </div>
                        );
                      })}
                    </div>

                    {!isOpenToPassengers && (
                      <div className="absolute top-1.5 left-1/2 -translate-x-1/2">
                        <NoPassengersIcon />
                      </div>
                    )}

                    <div className="flex items-center gap-4">
                      <Button
                        danger
                        size="small"
                        disabled={!isOpenToPassengers}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteMaterielRoulant(index);
                        }}
                      >
                        <Trash2 size={14} className="-mr-1" />
                        Supprimer
                      </Button>

                      <div>
                        <Field
                          inline
                          as={Switch}
                          label="Ouvert aux voyageurs"
                          name={`parcours.pointDeParcours.${index}.arret.${compositionPlace}.composition.materielRoulant.${mrIndex}.ouvertAuxVoyageurs`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null
        ) : (
          <p className="flex items-center justify-center text-gray-500">
            Aucune composition trouvée pour cet arrêt.
          </p>
        )}
      </div>
    </div>
  );
};

export default UpdateContentCompositionTab;
