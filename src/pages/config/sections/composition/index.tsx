import { useEffect } from "react";
import { Button, Tabs } from "antd";
import { Plus } from "lucide-react";
import CompositionTrains from "./trains";
import CompositionVehicles from "./vehicles";
import { __routes__ } from "@/constants/routes";
import PageHeader from "@/components/page-header";
import { useNavigate, useParams } from "react-router-dom";
import { ConfigSidebarElementsNames } from "../../sidebar";

interface CompositionConfigSectionProps {}

export enum CompositionTabs {
  Trains = "trains",
  Vehicules = "vehicules",
}

const CompositionConfigSection: React.FC<
  CompositionConfigSectionProps
> = ({}) => {
  const navigate = useNavigate();
  const { subsection } = useParams();

  const onClickAdd = () => {
    // Handle the add button click
  };

  useEffect(() => {
    if (
      !subsection ||
      !Object.values(CompositionTabs).includes(subsection as any)
    ) {
      navigate(
        __routes__.Config.SubSections.Main.replace(
          ":subsection",
          CompositionTabs.Trains
        ).replace(":section", ConfigSidebarElementsNames.Composition)
      );
    }
  }, [subsection]);

  return (
    <div>
      <PageHeader
        title="Composition"
        rightComponent={
          <Button onClick={onClickAdd} type="primary">
            <Plus size={16} />
            Ajouter
          </Button>
        }
      />

      <div className="px-6">
        <Tabs
          activeKey={subsection}
          onChange={(key) =>
            navigate(
              __routes__.Config.SubSections.Main.replace(
                ":subsection",
                key
              ).replace(":section", ConfigSidebarElementsNames.Composition)
            )
          }
        >
          <Tabs.TabPane
            tab={<span className="font-medium">Matériels roulants</span>}
            key={CompositionTabs.Trains}
          >
            <CompositionTrains />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={<span className="font-medium">Vehicules</span>}
            key={CompositionTabs.Vehicules}
          >
            <CompositionVehicles />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default CompositionConfigSection;
