import { Button } from "antd";
import PageHeader from "@/components/page-header";
import FormikForm from "@/components/formik/form";

interface CompositionCompositionFormProps {}

const CompositionCompositionForm: React.FC<
  CompositionCompositionFormProps
> = ({}) => {
  const handleSubmitForm = async (values: any) => {};

  return (
    <div className="bg-primary-bg">
      <PageHeader title="Créer une composition" />

      <FormikForm
        withLoadingToast
        onSubmit={handleSubmitForm}
        initialValues={{}}
      >
        {() => {
          return (
            <main className="px-6">
              <div className="flex flex-col shadow border border-gray-200  rounded h-[calc(100vh-88px)] bg-white">
                <div className="flex-1 overflow-y-auto"></div>

                <div className="flex justify-end gap-4 border-t border-gray-200 p-4">
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

export default CompositionCompositionForm;
