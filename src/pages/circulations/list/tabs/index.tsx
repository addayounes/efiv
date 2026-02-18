import { Tabs, Tooltip } from "antd";
import DraftCirculations from "./draft";
import PreOperationalCirculations from "./pre-operational";

interface CirculationsTabsProps {}

const CirculationsTabs: React.FC<CirculationsTabsProps> = ({}) => {
  return (
    <div className="px-6">
      <Tabs>
        <Tabs.TabPane
          tab={
            <Tooltip
              placement="bottom"
              mouseEnterDelay={1}
              title="Trains planifiés mais pas encore actifs (envoyés/acceptés ou non
                envoyés)."
            >
              <span className="font-medium">Pré-opérationnels</span>
            </Tooltip>
          }
          key="pre-operational"
        >
          <PreOperationalCirculations />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <Tooltip
              placement="bottom"
              mouseEnterDelay={1}
              title="Trains en cours de création, non encore envoyés."
            >
              <span className="font-medium">Brouillons</span>
            </Tooltip>
          }
          key="draft"
        >
          <DraftCirculations />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default CirculationsTabs;
