import {
  getSubModesForMode,
  CIRCULATION_MODE_OPTIONS,
} from "../../../../constants/mode-sub-mode";
import { useMemo } from "react";
import { Collapse } from "antd";
import { Field, useFormikContext } from "formik";
import Select from "../../../../components/formik/select";
import Switch from "../../../../components/formik/switch";
import TextField from "../../../../components/formik/textfield";
import FormGroupTitle from "../../../../components/formik/group-title";
import { TRAIN_LENGTH_OPTIONS } from "../../../../constants/train-length";
import type { CreateCirculationDto } from "../../../../types/dto/create-circulation";
import { OnboardServices } from "../../../../constants/onboard-services";

interface GeneralStepProps {}

const GeneralStep: React.FC<GeneralStepProps> = ({}) => {
  const { values, setFieldValue } = useFormikContext<CreateCirculationDto>();

  const subModes = useMemo(
    () => getSubModesForMode(values.mode as any),
    [values.mode]
  );

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
          />
          <Field
            as={TextField}
            placeholder="XXXX"
            label="Nom commercial"
            name="nomCommercial"
          />
          <Field
            as={TextField}
            placeholder="TGV"
            label="Marque commercial"
            name="marqueCommerciale"
          />
        </div>
        <div className="flex items-center gap-4">
          <Field
            as={TextField}
            placeholder="A"
            name="ligneCommerciale"
            label="Ligne commercial"
          />
          <Field
            allowClear
            as={Select}
            name="mode"
            label="Mode"
            className="w-full"
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
            disabled={subModes.length === 0}
          />
        </div>

        <div>
          <Field
            allowClear
            as={Select}
            name="longueur"
            label="Longueur"
            className="w-full"
            placeholder="Sélectionner une longueur"
            options={TRAIN_LENGTH_OPTIONS}
          />
        </div>

        <div className="mt-8">
          <Collapse
            size="small"
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
                          placeholder="Ex: Livraison de matériel"
                          name="libelleCourseSpeciale"
                          label="Libellé course spéciale"
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
          <Field
            allowClear
            as={Select}
            name="origine"
            label="Origine"
            className="w-full"
            placeholder="Sélectionner l'origine"
            options={[]}
          />
          <div className="relative ml-3">
            {/* Line */}
            <div className="absolute right-4 -top-4 w-px h-10 bg-gray-300" />
            {/* Bubble */}
            <div className="w-2 h-2 rounded-full bg-gray-300 absolute right-[12.5px]" />
          </div>
          <Field
            allowClear
            as={Select}
            name="destination"
            label="Destination"
            className="w-full"
            placeholder="Sélectionner la destination"
            options={[]}
          />
        </div>

        <div className="mt-12">
          <FormGroupTitle>Services à bord</FormGroupTitle>
        </div>
        <div>
          <Field
            allowClear
            as={Select}
            mode="multiple"
            className="w-full"
            name="serviceDeCourse"
            label="Service à bord"
            placeholder="Sélectionner le service à bord"
            options={OnboardServices}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralStep;
