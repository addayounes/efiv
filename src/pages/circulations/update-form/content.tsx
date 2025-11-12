import { Tabs } from "antd";
import type { ICirculationCourse } from "@/types/entity/circulation";
import UpdateOperationalRouteTab from "./tabs/route";
import UpdateOperationalCompositionTab from "./tabs/composition";

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
          key="composition"
          tab={<span className="font-medium">Composition</span>}
        >
          <UpdateOperationalCompositionTab circulation={circulation} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default UpdateOperationalCirculationContent;
