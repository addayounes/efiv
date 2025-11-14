import { Tabs } from "antd";
import { useFormikContext } from "formik";
import UpdateOperationalRouteTab from "./tabs/route";
import UpdateOperationalConjInfoTab from "./tabs/info-conj";
import type { ICirculationCourse } from "@/types/entity/circulation";

interface UpdateOperationalCirculationContentProps {}

const UpdateOperationalCirculationContent: React.FC<
  UpdateOperationalCirculationContentProps
> = () => {
  const { values } = useFormikContext<ICirculationCourse>();
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
          <UpdateOperationalConjInfoTab />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default UpdateOperationalCirculationContent;
