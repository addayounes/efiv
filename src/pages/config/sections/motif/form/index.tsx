import { Button } from "antd";
import { Field } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { __routes__ } from "@/constants/routes";
import FormikForm from "@/components/formik/form";
import PageHeader from "@/components/page-header";
import TextArea from "@/components/formik/textarea";
import { motifSchema } from "@/validation/create-motif";
import type { ICreateMotifRetard } from "@/types/dto/create-motif";
import { ConfigSidebarElementsNames } from "@/pages/config/sidebar";

interface MotifFormProps {}

const MotifForm: React.FC<MotifFormProps> = ({}) => {
  const navigate = useNavigate();

  const handleSubmitForm = async (values: ICreateMotifRetard) => {
    console.log(values);

    navigate(
      __routes__.Config.SubSections.Main.replace(
        ":section",
        ConfigSidebarElementsNames.MotifRetard
      )
    );

    toast.success("Motif créé avec succès");
  };

  return (
    <FormikForm
      withLoadingToast
      onSubmit={handleSubmitForm}
      validationSchema={motifSchema}
      initialValues={{ externe: "", interne: "" }}
    >
      {() => {
        return (
          <div className="bg-primary-bg h-screen overflow-y-auto pb-10">
            <div className="max-w-7xl mx-auto">
              <PageHeader
                title="Créer un motif de retard"
                backTo={__routes__.Config.SubSections.Main.replace(
                  ":section",
                  ConfigSidebarElementsNames.MotifRetard
                )}
                rightComponent={
                  <Button htmlType="submit" type="primary">
                    Enregistrer
                  </Button>
                }
              />
              <main className="px-6 mt-6">
                <div className="border border-gray-200 rounded p-4 bg-white">
                  <div className="flex items-center gap-4">
                    <Field
                      rows={4}
                      as={TextArea}
                      name="interne"
                      resizable={false}
                      className="flex-1"
                      label="Motif interne"
                      placeholder="Saisir le motif interne"
                    />
                    <Field
                      rows={4}
                      as={TextArea}
                      name="externe"
                      resizable={false}
                      label="Motif externe"
                      placeholder="Saisir le motif externe"
                    />
                  </div>
                </div>
              </main>
            </div>
          </div>
        );
      }}
    </FormikForm>
  );
};

export default MotifForm;
