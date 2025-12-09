import { Button } from "antd";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { __routes__ } from "@/constants/routes";
import CreateCompositionContent from "./content";
import PageHeader from "@/components/page-header";
import FormikForm from "@/components/formik/form";
import { createCompositionService } from "@/services/composition";
import { ConfigSidebarElementsNames } from "@/pages/config/sidebar";
import { compositionSchema } from "@/validation/create-composition";
import { type CreateComposition } from "@/types/dto/create-circulation";
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
      validationSchema={compositionSchema}
      initialValues={{
        code: "",
        name: "",
        materielRoulant: [] as CreateComposition["materielRoulant"],
      }}
    >
      {() => {
        return (
          <div className="bg-primary-bg h-screen overflow-y-auto pb-10">
            <div className="max-w-7xl mx-auto">
              <PageHeader
                title="Créer une composition"
                rightComponent={
                  <Button htmlType="submit" type="primary">
                    Enregistrer
                  </Button>
                }
              />
              <main className="px-6 mt-6">
                <CreateCompositionContent
                  selected={selected}
                  setSelected={setSelected}
                />
              </main>
            </div>
          </div>
        );
      }}
    </FormikForm>
  );
};

export default CompositionForm;
