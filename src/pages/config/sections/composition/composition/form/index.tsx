import {
  type CreateComposition,
  ElementMaterielRoulantType,
} from "@/types/dto/create-circulation";
import { Button } from "antd";
import { useState } from "react";
import { type FormikContextType } from "formik";
import CreateCompositionContent from "./content";
import PageHeader from "@/components/page-header";
import FormikForm from "@/components/formik/form";
import { createCompositionService } from "@/services/composition";
import { useNavigate } from "react-router-dom";
import { __routes__ } from "@/constants/routes";
import { toast } from "react-hot-toast";
import { ConfigSidebarElementsNames } from "@/pages/config/sidebar";
import { mapCreateCompositionToDto } from "@/mappers/create-composition";

interface CompositionFormProps {}

export interface SelectedState {
  train: number;
  car: number;
}

const CompositionForm: React.FC<CompositionFormProps> = ({}) => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState<SelectedState>({
    train: -1,
    car: -1,
  });

  const onClickAddMaterielRoulant = ({
    values,
    setFieldValue,
  }: FormikContextType<CreateComposition>) => {
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

  const handleSubmitForm = async (values: CreateComposition) => {
    const responseData = await createCompositionService(
      mapCreateCompositionToDto(values)
    );

    if (!responseData) throw new Error("No data returned from service");

    navigate(
      __routes__.Config.SubSections.Main.replace(
        ":section",
        ConfigSidebarElementsNames.Composition
      )
    );

    toast.success("Composition créée avec succès");
  };

  return (
    <FormikForm
      withLoadingToast
      onSubmit={handleSubmitForm}
      initialValues={{
        name: "",
        code: "",
        materielRoulant: [] as CreateComposition["materielRoulant"],
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
