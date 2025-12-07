import type {
  ParcoursDto,
  CreateCirculationDto,
} from "@/types/dto/create-circulation";
import { cn } from "@/utils/cn";
import { Loader } from "lucide-react";
import { useFormikContext } from "formik";
import { alignArraysBy } from "@/utils/array.utils";
import { Select as AntSelect, Checkbox } from "antd";
import { useEffect, useMemo, useState } from "react";
import { getCouplableCirculationService } from "@/services/circulations";
import type { ICirculation, PointDeParcour } from "@/types/entity/circulation";

interface CouplageTabProps {}

const CreateCouplageTab: React.FC<CouplageTabProps> = () => {
  const [loading, setLoading] = useState(false);
  const [trains, setTrains] = useState<any[]>([]);
  const [selectedStations, setSelectedStations] = useState<string[]>([]);
  const { values, setFieldValue } = useFormikContext<CreateCirculationDto>();
  const [selectedTrain, setSelectedTrain] = useState<ICirculation | null>(null);

  const trainsOptions = trains.map((train) => ({
    label: `N° ${train.numeroCommercial} - ${train.origine?.libelle12} ➝ ${train.destination?.libelle12}`,
    value: train.id,
  }));

  const { currentTrain, trainToCouple, stopsLineData } = useMemo(() => {
    const { arr1, arr2, merged } = alignArraysBy(
      values?.parcours || [],
      [...(selectedTrain?.parcours?.pointDeParcours || [])].map((p) => ({
        ...p,
        station: {
          value: p.desserte?.codeUIC || "",
          label: p.desserte?.libelle23 || "",
          title: p.desserte?.libelle12 || "",
        },
      })),
      (d) => d?.station?.value
    );
    return { currentTrain: arr1, trainToCouple: arr2, stopsLineData: merged };
  }, [values?.parcours, selectedTrain]);

  const handleApplyChanges = () => {
    if (!selectedStations?.length) return;

    const currentParcours = [...(values.parcours || [])];

    const commonStationsInOrder = currentParcours
      .filter((s) =>
        (selectedTrain?.parcours?.pointDeParcours ?? [])
          .map((sts) => sts.desserte?.codeUIC)
          .includes(s.station?.value!)
      )
      .map((s) => s.station?.value);

    const newParcours = currentParcours.map((s, index) => {
      const isOrigin = index === 0;
      const isDestination = index === currentParcours.length - 1;
      const commonStation = selectedStations.find(
        (ss) => ss === s?.station?.value
      );
      if (!!commonStation) {
        const isFirstCommon =
          commonStationsInOrder.indexOf(s?.station?.value) === 0;
        const isLastCommon =
          commonStationsInOrder.indexOf(s?.station?.value) ===
          commonStationsInOrder.length - 1;
        return {
          ...s,
          arrivee:
            isOrigin || isFirstCommon
              ? s?.arrivee
              : {
                  ...s.arrivee,
                  numeroSillon: `${values.numeroCommercial}-${selectedTrain?.numeroCommercial}`,
                },
          depart:
            isDestination || isLastCommon
              ? s?.depart
              : {
                  ...s.depart,
                  numeroSillon: `${values.numeroCommercial}-${selectedTrain?.numeroCommercial}`,
                },
        };
      }
      return s;
    });

    setFieldValue("parcours", newParcours);
    setFieldValue("chainageCourseSuivante", {
      date: selectedTrain?.date,
      mode: selectedTrain?.mode,
      idTransporteur: selectedTrain?.transporteur?.id,
      numeroCommercial: selectedTrain?.numeroCommercial,
    });
  };

  const onChangeStopSelection = (codeUIC: string, checked: boolean) => {
    if (checked) setSelectedStations((prev) => [...prev, codeUIC]);
    else setSelectedStations((prev) => prev.filter((x) => x !== codeUIC));
  };

  useEffect(() => {
    handleApplyChanges();
  }, [selectedStations]);

  useEffect(() => {
    const fetchTrains = async () => {
      setLoading(true);
      const formattedStops = values.parcours?.map((stop) => ({
        codeUIC: stop?.station?.value!,
        departureHour: stop?.depart?.horaire!,
      }));
      const data = await getCouplableCirculationService(
        values.date || "",
        formattedStops
      );
      setTrains(data || []);
      setLoading(false);
    };

    fetchTrains();
  }, []);

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
                value={`N° ${values.numeroCommercial} - ${values.origine?.label} ➝ ${values.destination?.label}`}
              />
            </div>
          </div>

          <h3 className="font-medium">Dessertes</h3>

          <div className="space-y-2">
            {currentTrain.map((stop, index) => (
              <StopPointItem
                key={index}
                stop={stop}
                isCommon={
                  !!trainToCouple.find((s) =>
                    s?.desserte
                      ? s.desserte.codeUIC === stop?.station?.value
                      : false
                  )
                }
                checked={selectedStations.includes(stop?.station?.value || "")}
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
                isCommon={
                  !!currentTrain.find((s) =>
                    s?.station
                      ? s.station?.value === stop?.desserte?.codeUIC
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
                stopPair.toCouple?.station?.value || ""
              );
              const isStopCommon =
                stopPair.current?.station?.value ===
                stopPair.toCouple?.station?.value;

              const nextItem = stopsLineData[index + 1];

              const isLastItem = index === stopsLineData.length - 1;

              const isToCoupleStartOfMerge =
                selectedStations.includes(
                  nextItem?.toCouple?.station?.value || ""
                ) &&
                nextItem?.current?.station?.value ===
                  nextItem?.toCouple?.station?.value;

              const isCurrentStartOfMerge =
                selectedStations.includes(
                  nextItem?.current?.station?.value || ""
                ) &&
                nextItem?.current?.station?.value ===
                  nextItem?.toCouple?.station?.value;

              return (
                <div key={index} className="flex gap-10">
                  {stopPair.current &&
                  stopPair.toCouple &&
                  isStopLinked &&
                  isStopCommon ? (
                    <div className="flex gap-6 relative translate-x-7">
                      <p className="font-medium absolute right-10 top-1/2 -translate-y-1/2 whitespace-nowrap">
                        {stopPair.current?.station?.label}
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
                          {stopPair.current?.station?.label}
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
                          {stopPair.toCouple?.station?.label}
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
  stop: ParcoursDto | null;
  checked: boolean;
  isCommon: boolean;
}> = ({ stop, checked, isCommon }) => {
  if (!stop || !isCommon)
    return (
      <div
        className={cn(
          "px-4 py-2 border border-gray-300 rounded bg-gray-200 cursor-not-allowed",
          { "bg-red-50 border-red-300 text-red-700": !stop }
        )}
      >
        <em>{stop?.station?.label ?? "Aucune desserte"}</em>
      </div>
    );

  return (
    <div
      className={cn(
        "px-4 py-2 border border-gray-300 rounded text-gray-600",
        checked && "bg-primary-light border-primary"
      )}
    >
      <h4>{stop?.station?.label}</h4>
    </div>
  );
};

const StopPointToCoupleItem: React.FC<{
  checked: boolean;
  isCommon: boolean;
  stop: PointDeParcour | null;
  onChange: (checked: boolean) => void;
}> = ({ stop, checked, isCommon, onChange }) => {
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

export default CreateCouplageTab;
