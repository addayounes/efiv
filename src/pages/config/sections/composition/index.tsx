import { useEffect } from "react";
import { Button, Tabs } from "antd";
import { Plus } from "lucide-react";
import CompositionTrains from "./trains/list";
import { __routes__ } from "@/constants/routes";
import CompositionVehicles from "./vehicles/list";
import PageHeader from "@/components/page-header";
import CompositionComposition from "./composition/list";
import { useNavigate, useParams } from "react-router-dom";
import { ConfigSidebarElementsNames } from "../../sidebar";

interface CompositionConfigSectionProps {}

export enum CompositionTabs {
  Trains = "trains",
  Vehicules = "vehicules",
  Composition = "composition",
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
          CompositionTabs.Composition
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
            key={CompositionTabs.Composition}
            tab={<span className="font-medium">Composition</span>}
          >
            <CompositionComposition />
          </Tabs.TabPane>
          <Tabs.TabPane
            key={CompositionTabs.Trains}
            tab={<span className="font-medium">Matériels roulants</span>}
          >
            <CompositionTrains />
          </Tabs.TabPane>
          <Tabs.TabPane
            key={CompositionTabs.Vehicules}
            tab={<span className="font-medium">Vehicules</span>}
          >
            <CompositionVehicles />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default CompositionConfigSection;
