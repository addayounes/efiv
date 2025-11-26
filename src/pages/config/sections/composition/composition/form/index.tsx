import { Button } from "antd";
import CreateCompositionContent from "./content";
import PageHeader from "@/components/page-header";
import FormikForm from "@/components/formik/form";
import type { Composition } from "@/types/dto/create-circulation";

interface CompositionFormProps {}

const CompositionForm: React.FC<CompositionFormProps> = ({}) => {
  const handleSubmitForm = async (values: Composition) => {};

  return (
    <div className="bg-primary-bg">
      <PageHeader title="Créer une composition" />

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
        {() => {
          return (
            <main className="px-6">
              <div className="flex flex-col h-[calc(100vh-64px)]">
                <div className="flex-1 overflow-y-auto">
                  <CreateCompositionContent />
                </div>

                <div className="flex justify-end p-4 pb-8">
                  <Button htmlType="submit" type="primary">
                    Enregistrer
                  </Button>
                </div>
              </div>
            </main>
          );
        }}
      </FormikForm>
    </div>
  );
};

export default CompositionForm;
