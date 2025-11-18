import { Tabs } from "antd";
import { useFormikContext } from "formik";
import UpdateOperationalRouteTab from "./tabs/route";
import type { ICirculation } from "@/types/entity/circulation";
import InfoConjConfig from "../create-form/steps/components/info-conj";

interface UpdateOperationalCirculationContentProps {}

const UpdateOperationalCirculationContent: React.FC<
  UpdateOperationalCirculationContentProps
> = () => {
  const { values } = useFormikContext<ICirculation>();
  return (
    <div className="p-4 pt-2">
      <Tabs>
        <Tabs.TabPane
          key="route"
          tab={
            <span className="font-medium">
              Dessertes ({values?.parcours?.pointDeParcours?.length ?? 0})
            </span>
          }
        >
          <UpdateOperationalRouteTab />
        </Tabs.TabPane>
        <Tabs.TabPane
          key="info-conj"
          tab={
            <span className="font-medium">Informations conjoncturelles</span>
          }
        >
          <InfoConjConfig />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default UpdateOperationalCirculationContent;
