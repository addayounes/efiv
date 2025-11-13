import { Tabs } from "antd";
import type { ICirculationCourse } from "@/types/entity/circulation";
import UpdateOperationalRouteTab from "./tabs/route";
import UpdateOperationalConjInfoTab from "./tabs/info-conj";

interface UpdateOperationalCirculationContentProps {
  circulation: ICirculationCourse;
}

const UpdateOperationalCirculationContent: React.FC<
  UpdateOperationalCirculationContentProps
> = ({ circulation }) => {
  return (
    <div className="p-4 pt-2">
      <Tabs>
        <Tabs.TabPane
          key="route"
          tab={
            <span className="font-medium">
              Dessertes ({circulation?.parcours?.pointDeParcours?.length ?? 0})
            </span>
          }
        >
          <UpdateOperationalRouteTab circulation={circulation} />
        </Tabs.TabPane>
        <Tabs.TabPane
          key="info-conj"
          tab={
            <span className="font-medium">Informations conjoncturelles</span>
          }
        >
          <UpdateOperationalConjInfoTab circulation={circulation} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default UpdateOperationalCirculationContent;
