import { Button, Tabs } from "antd";
import { Plus } from "lucide-react";
import PageHeader from "@/components/page-header";

interface CompositionConfigSectionProps {}

export enum CompositionTabs {
  Trains = "trains",
  Vehicules = "vehicules",
}

const CompositionConfigSection: React.FC<
  CompositionConfigSectionProps
> = ({}) => {
  const onClickAdd = () => {
    // Handle the add button click
  };

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
        <Tabs>
          <Tabs.TabPane
            tab={<span className="font-medium">Matériels roulants</span>}
            key={CompositionTabs.Trains}
          ></Tabs.TabPane>
          <Tabs.TabPane
            tab={<span className="font-medium">Vehicules</span>}
            key={CompositionTabs.Vehicules}
          ></Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default CompositionConfigSection;
