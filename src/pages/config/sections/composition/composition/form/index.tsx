import {
  type Composition,
  ElementMaterielRoulantType,
} from "@/types/dto/create-circulation";
import { Button } from "antd";
import { useState } from "react";
import { type FormikContextType } from "formik";
import CreateCompositionContent from "./content";
import PageHeader from "@/components/page-header";
import FormikForm from "@/components/formik/form";

interface CompositionFormProps {}

export interface SelectedState {
  train: number;
  car: number;
}

const CompositionForm: React.FC<CompositionFormProps> = ({}) => {
  const [selected, setSelected] = useState<SelectedState>({
    train: -1,
    car: -1,
  });

  const onClickAddMaterielRoulant = ({
    values,
    setFieldValue,
  }: FormikContextType<Composition>) => {
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

  const handleSubmitForm = async (values: Composition) => {};

  return (
    <FormikForm
      withLoadingToast
      onSubmit={handleSubmitForm}
      initialValues={{
        materielRoulant: [
          {
            elementMaterielRoulantAsync: new Array(10)
              .fill(null)
              .map((_, index) => ({
                porte: [{ position: index + 1 }],
                libelle: (index + 1).toString(),
                longueur: 2001,
              })),

            serie: "",
            sousSerie: "",
            sousSerie2: "",
            ouvertAuxVoyageurs: false,
          },
        ],
      }}
    >
      {(formik) => {
        return (
          <div className="bg-primary-bg">
            <PageHeader
              title="Créer une composition"
              rightComponent={
                <Button
                  htmlType="button"
                  onClick={() => onClickAddMaterielRoulant(formik)}
                >
                  Ajouter un matériel roulant
                </Button>
              }
            />

            <main className="px-6">
              <div className="flex flex-col h-[calc(100vh-64px)]">
                <div className="flex-1 overflow-y-auto">
                  <CreateCompositionContent
                    selected={selected}
                    setSelected={setSelected}
                  />
                </div>

                <div className="flex justify-end p-4 pb-8">
                  <Button htmlType="submit" type="primary">
                    Enregistrer
                  </Button>
                </div>
              </div>
            </main>
          </div>
        );
      }}
    </FormikForm>
  );
};

export default CompositionForm;
