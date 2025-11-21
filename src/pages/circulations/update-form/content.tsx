import { Tabs } from "antd";
import UpdateCouplageTab from "./tabs/couplage";
import UpdateOperationalRouteTab from "./tabs/route";
import InfoConjConfig from "../create-form/steps/components/info-conj";

interface UpdateOperationalCirculationContentProps {}

const UpdateOperationalCirculationContent: React.FC<
  UpdateOperationalCirculationContentProps
> = () => {
  return (
    <div className="p-4 pt-2">
      <Tabs>
        <Tabs.TabPane
          key="route"
          tab={<span className="font-medium">Dessertes</span>}
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
        <Tabs.TabPane
          key="couplage"
          tab={<span className="font-medium">Couplage</span>}
        >
          <UpdateCouplageTab />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default UpdateOperationalCirculationContent;
