import {
  getSubModesForMode,
  CIRCULATION_MODE_OPTIONS,
} from "@/constants/mode-sub-mode";
import { Collapse } from "antd";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import Select from "@/components/formik/select";
import Switch from "@/components/formik/switch";
import { Field, useFormikContext } from "formik";
import TextField from "@/components/formik/textfield";
import FormGroupTitle from "@/components/group-title";
import StationsField from "./components/stations-field";
import { TRAIN_LENGTH_OPTIONS } from "@/constants/train-length";
import type { CreateCirculationDto } from "@/types/dto/create-circulation";

interface GeneralStepProps {}

const GeneralStep: React.FC<GeneralStepProps> = ({}) => {
  const { state } = useLocation();
  const { values, setFieldValue } = useFormikContext<CreateCirculationDto>();

  const isCreatingVariant = !!state?.id;

  const subModes = useMemo(
    () => getSubModesForMode(values.mode as any),
    [values.mode],
  );

  const handleOriginDestinationChange = async (
    field: "origin" | "destination",
    newStation: any,
  ) => {
    const newParcours = [...(values.parcours ?? [])];

    if (field === "origin")
      newParcours[0] = { ...newParcours[0], station: newStation };

    if (field === "destination")
      newParcours[newParcours.length - 1] = {
        ...newParcours[newParcours.length - 1],
        station: newStation,
      };

    await setFieldValue("parcours", newParcours);
  };

  const fillSillonInParcoursStops = async (sillon: string) => {
    const newParcours = [...(values.parcours ?? [])].map((s, index, arr) => ({
      ...s,
      depart: s.depart
        ? index === 0
          ? { ...s.depart, numeroSillon: sillon }
          : s.depart
        : s.depart,
      arrivee: s.arrivee
        ? index === arr.length - 1
          ? { ...s.arrivee, numeroSillon: sillon }
          : s.arrivee
        : s.arrivee,
    }));

    await setFieldValue("parcours", newParcours);
  };

  return (
    <div className="flex h-full">
      <div className="flex-2/3 space-y-4 p-4 border-r border-gray-200">
        <div>
          <FormGroupTitle>Informations principales</FormGroupTitle>
        </div>
        <div className="flex items-center gap-4">
          <Field
            as={TextField}
            placeholder="8960"
            label="N° commercial"
            name="numeroCommercial"
            disabled={isCreatingVariant}
            onChange={(e: any) => {
              setFieldValue("numeroCommercial", e.target.value);
              fillSillonInParcoursStops(e.target.value);
            }}
          />
          <Field
            as={TextField}
            placeholder="XXXX"
            name="nomCommercial"
            label="Nom commercial"
            disabled={isCreatingVariant}
          />
          <Field
            as={TextField}
            placeholder="TGV"
            name="marqueCommerciale"
            label="Marque commercial"
            disabled={isCreatingVariant}
          />
        </div>
        <div className="flex items-center gap-4">
          <Field
            as={TextField}
            placeholder="A"
            name="ligneCommerciale"
            label="Ligne commercial"
            disabled={isCreatingVariant}
          />
          <Field
            allowClear
            as={Select}
            name="mode"
            label="Mode"
            className="w-full"
            disabled={isCreatingVariant}
            placeholder="Sélectionner un mode"
            options={CIRCULATION_MODE_OPTIONS}
            onChange={() => setFieldValue("sousMode", undefined)}
          />
          <Field
            allowClear
            as={Select}
            name="sousMode"
            label="Sous-mode"
            options={subModes}
            className="w-full"
            placeholder={
              subModes.length === 0
                ? "Sélectionner un mode d'abord"
                : "Sélectionner un sous-mode"
            }
            disabled={isCreatingVariant || subModes.length === 0}
          />
        </div>

        <div>
          <Field
            allowClear
            as={Select}
            name="longueur"
            label="Longueur"
            className="w-full"
            disabled={isCreatingVariant}
            options={TRAIN_LENGTH_OPTIONS}
            placeholder="Sélectionner une longueur"
          />
        </div>

        <div className="mt-8">
          <Collapse
            items={[
              {
                key: "1",
                label: (
                  <h3 className="font-medium">Informations supplémentaires</h3>
                ),
                children: (
                  <div className="flex gap-4 p-2">
                    <div className="w-full">
                      <Field
                        as={Switch}
                        name="videVoyageur"
                        label="Vide voyageur"
                      />
                    </div>
                    <div className="w-full">
                      <Field
                        as={Switch}
                        name="courseSpeciale"
                        label="Course spéciale"
                        onChange={(checked: boolean) => {
                          if (!checked)
                            setFieldValue("libelleCourseSpeciale", undefined);
                        }}
                      />
                    </div>

                    <div className="w-full">
                      {values.courseSpeciale && (
                        <Field
                          as={TextField}
                          disabled={isCreatingVariant}
                          name="libelleCourseSpeciale"
                          label="Libellé course spéciale"
                          placeholder="Ex: Livraison de matériel"
                        />
                      )}
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>

      <div className="flex-1/3 p-4 space-y-4">
        <FormGroupTitle>Origine et destination</FormGroupTitle>
        <div className="space-y-4">
          <StationsField
            name="origine"
            label="Origine"
            className="w-full"
            disabled={isCreatingVariant}
            placeholder="Sélectionner l'origine"
            onChange={async (stationValue: any) => {
              await handleOriginDestinationChange("origin", stationValue);
            }}
          />
          <div className="relative ml-3">
            {/* Line */}
            <div className="absolute left-1/2 -top-4 w-px h-10 bg-gray-300" />
            {/* Bubble */}
            <div className="w-2 h-2 rounded-full bg-gray-300 absolute left-[calc(50%-3.1px)]" />
          </div>
          <StationsField
            name="destination"
            className="w-full"
            label="Destination"
            disabled={isCreatingVariant}
            placeholder="Sélectionner la destination"
            onChange={async (stationValue: any) => {
              await handleOriginDestinationChange("destination", stationValue);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralStep;
