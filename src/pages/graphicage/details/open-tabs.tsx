import { Tabs } from "antd";
import { linesData } from "../lines";
import { __routes__ } from "@/constants/routes";
import { useNavigate, useParams } from "react-router-dom";

interface GraphicageOpenLinesTabsProps {
  activeTabs: string[];
  setActiveTabs: React.Dispatch<React.SetStateAction<string[]>>;
}

const GraphicageOpenLinesTabs: React.FC<GraphicageOpenLinesTabsProps> = ({
  activeTabs,
  setActiveTabs,
}) => {
  const { line } = useParams();
  const navigate = useNavigate();

  const onEdit = (targetKey: any, action: "add" | "remove") => {
    if (action === "remove")
      setActiveTabs((prev) => prev.filter((tab) => tab !== targetKey));
  };

  return (
    <Tabs
      hideAdd
      size="small"
      onEdit={onEdit}
      className="w-full"
      type="editable-card"
      activeKey={line || undefined}
      onChange={(key) =>
        navigate(__routes__.Graphicage.Details.replace(":line", key))
      }
    >
      {activeTabs.map((tab) => {
        const targetLine = linesData.find((l) => l.value === tab);
        return (
          <Tabs.TabPane tab={targetLine?.label} key={tab}>
            {/*  */}
          </Tabs.TabPane>
        );
      })}
    </Tabs>
  );
};

export default GraphicageOpenLinesTabs;
