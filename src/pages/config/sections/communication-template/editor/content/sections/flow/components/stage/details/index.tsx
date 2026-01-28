import { Field } from "formik";
import { Button, Drawer } from "antd";
import { useAppDispatch } from "@/redux/utils";
import FormikForm from "@/components/formik/form";
import TextField from "@/components/formik/textfield";
import type { Stage } from "@/types/entity/communication";
import StageStageTimeConfigurator from "./time-configurator";
import { getPresetByConfig } from "@/constants/stage-timing";
import { setSelectedStage, updateStage } from "@/redux/slices/communication";

interface StageDetailsProps {
  stage: Stage | undefined;
  isOpen: boolean;
}

const StageDetails: React.FC<StageDetailsProps> = ({ stage, isOpen }) => {
  const dispatch = useAppDispatch();
  const onClose = () => dispatch(setSelectedStage(undefined));

  const initialValues = {
    name: stage?.name || "",
    actionsCount: stage?.actions?.length ?? 0,
    timingConfig: stage?.timingConfig || {},
    preset: getPresetByConfig(stage?.timingConfig || ({} as any))?.value,
  };

  const handleUpdateStage = async (data: any) => {
    const formattedData = {
      name: data.name,
      timingConfig: data.timingConfig,
    };
    dispatch(updateStage({ stageId: stage?.id || "", data: formattedData }));
    dispatch(setSelectedStage(undefined));
  };

  return (
    <Drawer
      mask={false}
      open={isOpen}
      onClose={onClose}
      title="Détails du stage"
    >
      <FormikForm
        enableReinitialize
        onSubmit={handleUpdateStage}
        initialValues={initialValues}
      >
        {() => {
          return (
            <div className="flex flex-col gap-4">
              <Field
                as={TextField}
                name="name"
                label="Libelle"
                placeholder="Libelle du stage"
              />
              <Field
                disabled
                as={TextField}
                name="actionsCount"
                label="Nombre d'actions"
              />
              <StageStageTimeConfigurator name="timingConfig" />

              <div className="flex justify-end mt-10">
                <Button htmlType="submit" type="primary">
                  Enregistrer
                </Button>
              </div>
            </div>
          );
        }}
      </FormikForm>
    </Drawer>
  );
};

export default StageDetails;
