import { cn } from "@/utils/cn";
import { Loader } from "lucide-react";
import { useFormikContext } from "formik";
import { alignArraysBy } from "@/utils/array.utils";
import { Select as AntSelect, Checkbox } from "antd";
import { useEffect, useMemo, useState } from "react";
import { CirculationStatus } from "@/constants/circulation-status";
import { getCouplableCirculationService } from "@/services/circulations";
import type { ICirculation, PointDeParcour } from "@/types/entity/circulation";

interface CouplageTabProps {}

// TODO: handle set selected train if already coupled

const UpdateCouplageTab: React.FC<CouplageTabProps> = () => {
  const [loading, setLoading] = useState(false);
  const [trains, setTrains] = useState<ICirculation[]>([]);
  const { values, setFieldValue } = useFormikContext<ICirculation>();
  const [selectedStations, setSelectedStations] = useState<string[]>([]);
  const [selectedTrain, setSelectedTrain] = useState<ICirculation | null>(null);

  const isTrainDeleted = values?.statut === CirculationStatus.Supprime;

  const trainsOptions = trains.map((train) => ({
    label: `N° ${train.numeroCommercial} - ${train.origine?.libelle12} ➝ ${train.destination?.libelle12}`,
    value: train.id,
  }));

  const { currentTrain, trainToCouple, stopsLineData } = useMemo(() => {
    const { arr1, arr2, merged } = alignArraysBy(
      values?.parcours?.pointDeParcours || [],
      selectedTrain?.parcours?.pointDeParcours || [],
      (d) => d?.desserte?.codeUIC
    );
    return { currentTrain: arr1, trainToCouple: arr2, stopsLineData: merged };
  }, [values?.parcours?.pointDeParcours, selectedTrain]);

  const handleApplyChanges = (newSelectedStations: string[]) => {
    if (!newSelectedStations?.length) return;

    const currentParcours = [...(values.parcours?.pointDeParcours || [])];

    const commonStationsInOrder = currentParcours
      .filter((s) =>
        (selectedTrain?.parcours?.pointDeParcours ?? [])
          .map((sts) => sts.desserte?.codeUIC)
          .includes(s.desserte?.codeUIC)
      )
      .map((s) => s.desserte?.codeUIC);

    const newParcours = currentParcours.map((s, index) => {
      const isOrigin = index === 0;
      const isDestination = index === currentParcours.length - 1;
      const commonStation = selectedStations.find(
        (ss) => ss === s?.desserte?.codeUIC
      );
      if (!!commonStation) {
        const isFirstCommon =
          commonStationsInOrder.indexOf(s?.desserte?.codeUIC) === 0;
        const isLastCommon =
          commonStationsInOrder.indexOf(s?.desserte?.codeUIC) ===
          commonStationsInOrder.length - 1;
        return {
          ...s,
          arret: {
            ...s.arret,
            arrivee:
              isOrigin || isFirstCommon
                ? s.arret?.arrivee
                : {
                    ...s.arret.arrivee,
                    numeroSillon: `${values.numeroCommercial}-${selectedTrain?.numeroCommercial}`,
                  },
            depart:
              isDestination || isLastCommon
                ? s.arret?.depart
                : {
                    ...s.arret.depart,
                    numeroSillon: `${values.numeroCommercial}-${selectedTrain?.numeroCommercial}`,
                  },
          },
        };
      }
      return s;
    });

    setFieldValue("parcours.pointDeParcours", newParcours);
    setFieldValue("chainageCourseSuivante", {
      date: selectedTrain?.date,
      mode: selectedTrain?.mode,
      idTransporteur: selectedTrain?.transporteur?.id,
      numeroCommercial: selectedTrain?.numeroCommercial,
    });
  };

  const handleSetFirstCommonStation = () => {
    const existingTrainCommongStations = [
      ...(values.parcours?.pointDeParcours || []),
    ]
      .filter((s) => {
        const [originalTrainArrival, coupledTrainArrival] =
          s.arret.arrivee?.numeroSillon?.split("-") || [];
        const [originalTrainDeparture, coupledTrainDeparture] =
          s.arret.depart?.numeroSillon?.split("-") || [];

        return (
          (!!coupledTrainDeparture &&
            originalTrainDeparture === values?.numeroCommercial) ||
          (!!coupledTrainArrival &&
            originalTrainArrival === values?.numeroCommercial)
        );
      })
      .map((s) => s.desserte?.codeUIC);

    setSelectedStations(existingTrainCommongStations);
  };

  const onChangeStopSelection = (codeUIC: string, checked: boolean) => {
    const newSelectedStations = checked
      ? [...selectedStations, codeUIC]
      : selectedStations.filter((x) => x !== codeUIC);

    setSelectedStations(newSelectedStations);
    handleApplyChanges(newSelectedStations);
    console.log("updated");
  };
  console.log("in body");

  useEffect(() => {
    const fetchTrains = async () => {
      setLoading(true);
      const formattedStops = values.parcours?.pointDeParcours?.map((stop) => ({
        codeUIC: stop.desserte?.codeUIC,
        departureHour: stop.arret.depart?.horaire,
      }));
      const data = await getCouplableCirculationService(
        values.date || "",
        formattedStops
      );
      setTrains(data);
      handleSetFirstCommonStation();
      setLoading(false);
    };

    fetchTrains();
  }, [values.parcours?.pointDeParcours, values.date]);

  return (
    <div className="flex flex-col gap-4 -mt-4">
      <div className="flex">
        <div className="space-y-4 basis-1/4 border-r border-gray-300 pt-4 pr-4">
          <div>
            <label
              htmlFor="station-select"
              className="text-sm text-gray-700 font-medium"
            >
              Course N° {values.numeroCommercial}
            </label>
            <div>
              <AntSelect
                disabled
                className="w-full"
                value={`N° ${values.numeroCommercial} - ${values.origine?.libelle12} ➝ ${values.destination?.libelle12}`}
              />
            </div>
          </div>

          <h3 className="font-medium">Dessertes</h3>

          <div className="space-y-2">
            {currentTrain.map((stop, index) => (
              <StopPointItem
                key={index}
                isTrainDeleted={isTrainDeleted}
                stop={stop as any}
                isCommon={
                  !!trainToCouple.find((s) =>
                    s?.desserte
                      ? s.desserte.codeUIC === stop?.desserte?.codeUIC
                      : false
                  )
                }
                checked={selectedStations.includes(
                  stop?.desserte?.codeUIC || ""
                )}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4 basis-1/4 border-r border-gray-300 pt-4 px-4">
          <div>
            <label
              htmlFor="station-select"
              className="text-sm text-gray-700 font-medium"
            >
              Course à coupler
            </label>
            <div>
              <AntSelect
                showSearch
                allowClear
                loading={loading}
                filterOption={false}
                options={trainsOptions}
                value={selectedTrain?.id}
                disabled={isTrainDeleted}
                className="min-w-96 w-full"
                placeholder="Rechercher une course"
                onChange={(value) => {
                  const train =
                    trains.find((train) => train.id === value) || null;
                  setSelectedTrain(train);
                  setSelectedStations([]);
                }}
                notFoundContent={
                  loading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Aucun résultat"
                  )
                }
              />
            </div>
          </div>

          <h3 className="font-medium">Dessertes</h3>

          <div className="space-y-2">
            {trainToCouple.map((stop, index) => (
              <StopPointToCoupleItem
                key={index}
                stop={stop as any}
                isTrainDeleted={isTrainDeleted}
                isCommon={
                  !!currentTrain.find((s) =>
                    s?.desserte
                      ? s.desserte.codeUIC === stop?.desserte?.codeUIC
                      : false
                  )
                }
                checked={selectedStations.includes(
                  stop?.desserte?.codeUIC || ""
                )}
                onChange={(checked) =>
                  onChangeStopSelection(stop?.desserte?.codeUIC || "", checked)
                }
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center flex-1 border-r border-gray-300 pt-4 px-4">
          <div className="mt-10 space-y-16">
            {stopsLineData?.map((stopPair, index) => {
              const isStopLinked = selectedStations.includes(
                stopPair.toCouple?.desserte?.codeUIC || ""
              );
              const isStopCommon =
                stopPair.current?.desserte?.codeUIC ===
                stopPair.toCouple?.desserte?.codeUIC;

              const nextItem = stopsLineData[index + 1];

              const isLastItem = index === stopsLineData.length - 1;

              const isToCoupleStartOfMerge =
                selectedStations.includes(
                  nextItem?.toCouple?.desserte?.codeUIC || ""
                ) &&
                nextItem?.current?.desserte?.codeUIC ===
                  nextItem?.toCouple?.desserte?.codeUIC;

              const isCurrentStartOfMerge =
                selectedStations.includes(
                  nextItem?.current?.desserte?.codeUIC || ""
                ) &&
                nextItem?.current?.desserte?.codeUIC ===
                  nextItem?.toCouple?.desserte?.codeUIC;

              return (
                <div key={index} className="flex gap-10">
                  {stopPair.current &&
                  stopPair.toCouple &&
                  isStopLinked &&
                  isStopCommon ? (
                    <div className="flex gap-6 relative translate-x-7">
                      <p className="font-medium absolute right-10 top-1/2 -translate-y-1/2 whitespace-nowrap">
                        {stopPair.current?.desserte?.libelle12}
                      </p>
                      <div className="w-4 h-4 rounded-full bg-primary z-10" />
                      {!isLastItem &&
                        !!nextItem.toCouple &&
                        (!isToCoupleStartOfMerge ? (
                          <div className="origin-top rotate-[-19deg] absolute w-1 h-18 bg-[#ACB8CA] top-[calc(100%-1px)] left-1/2" />
                        ) : (
                          <div className="absolute w-1 h-17 bg-primary top-[calc(100%-1px)] left-[calc(50%-2px)]" />
                        ))}

                      {!isLastItem &&
                        !!nextItem.current &&
                        (!isCurrentStartOfMerge ? (
                          <div className="origin-top rotate-[19deg] absolute w-1 h-18 bg-[#ACB8CA] top-[calc(100%-1px)] left-[calc(50%-4px)]" />
                        ) : (
                          <div className="absolute w-1 h-17 bg-primary top-[calc(100%-1px)] left-[calc(50%-2px)]" />
                        ))}
                    </div>
                  ) : (
                    <>
                      <div
                        className={cn(
                          "flex gap-6 relative",
                          !stopPair.current ? "opacity-0" : ""
                        )}
                      >
                        <p className="font-medium absolute right-10 top-1/2 -translate-y-1/2 whitespace-nowrap">
                          {stopPair.current?.desserte?.libelle12}
                        </p>
                        <div className="w-4 h-4 rounded-full bg-[#ACB8CA]" />

                        {!isLastItem &&
                          !!nextItem?.current &&
                          (isCurrentStartOfMerge ? (
                            <div className="origin-top rotate-[-19deg] absolute w-1 h-18 bg-[#ACB8CA] top-[calc(100%-1px)] left-1/2" />
                          ) : (
                            <div className="absolute w-1 h-17 bg-[#ACB8CA] top-[calc(100%-1px)] left-[calc(50%-2px)]" />
                          ))}
                      </div>

                      <div
                        className={cn(
                          "flex gap-6 relative",
                          !stopPair.toCouple ? "opacity-0" : ""
                        )}
                      >
                        <div className="w-4 h-4 rounded-full bg-[#ACB8CA]" />
                        <p className="font-medium absolute left-10 top-1/2 -translate-y-1/2 whitespace-nowrap">
                          {stopPair.toCouple?.desserte?.libelle12}
                        </p>
                        {!isLastItem &&
                          !!nextItem?.toCouple &&
                          (isToCoupleStartOfMerge ? (
                            <div className="origin-top rotate-[19deg] absolute w-1 h-18 bg-[#ACB8CA] top-[calc(100%-1px)] left-[calc(50%-4px)]" />
                          ) : (
                            <div className="absolute w-1 h-17 bg-[#ACB8CA] top-[calc(100%-1px)] left-[calc(50%-2px)]" />
                          ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const StopPointItem: React.FC<{
  stop: PointDeParcour | null;
  checked: boolean;
  isCommon: boolean;
  isTrainDeleted: boolean;
}> = ({ stop, checked, isCommon }) => {
  if (!stop || !isCommon)
    return (
      <div
        className={cn(
          "px-4 py-2 border border-gray-300 rounded bg-gray-200 cursor-not-allowed",
          { "bg-red-50 border-red-300 text-red-700": !stop }
        )}
      >
        <em>{stop?.desserte?.libelle23 ?? "Aucune desserte"}</em>
      </div>
    );

  return (
    <div
      className={cn(
        "px-4 py-2 border border-gray-300 rounded text-gray-600",
        checked && "bg-primary-light border-primary"
      )}
    >
      <h4>{stop?.desserte?.libelle23}</h4>
    </div>
  );
};

const StopPointToCoupleItem: React.FC<{
  checked: boolean;
  isCommon: boolean;
  isTrainDeleted: boolean;
  stop: PointDeParcour | null;
  onChange: (checked: boolean) => void;
}> = ({ stop, checked, isCommon, isTrainDeleted, onChange }) => {
  if (!stop || !isCommon)
    return (
      <div
        className={cn(
          "px-4 py-2 border border-gray-300 rounded bg-gray-200 cursor-not-allowed",
          { "bg-red-50 border-red-300 text-red-700": !stop }
        )}
      >
        <em>{stop?.desserte?.libelle23 ?? "Aucune desserte"}</em>
      </div>
    );

  return (
    <label
      htmlFor={stop.desserte.codeUIC}
      className={cn(
        "relative flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-gray-600 cursor-pointer",
        checked && "bg-primary-light border-primary"
      )}
    >
      <Checkbox
        checked={checked}
        disabled={isTrainDeleted}
        id={stop.desserte.codeUIC}
        onChange={(e) => onChange(e.target.checked)}
      />
      <h4>{stop?.desserte?.libelle23}</h4>

      {checked && (
        <span className="absolute -left-[34px] w-[34px] h-[1px] bg-primary" />
      )}
    </label>
  );
};

export default UpdateCouplageTab;
