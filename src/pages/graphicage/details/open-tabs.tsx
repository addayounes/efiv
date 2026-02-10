import { Tabs } from "antd";
import { GraphicageGraph } from "./graph";
import { __routes__ } from "@/constants/routes";
import { GraphicageChart } from "./graph-chartjs";
import { useNavigate, useParams } from "react-router-dom";
import type { ICirculation } from "@/types/entity/circulation";
import GraphV2Demo from "./versions/v2/demo";

interface GraphicageOpenLinesTabsProps {
  lines: string[];
  loading: boolean;
  data: ICirculation[];
  activeTabs: string[];
  setActiveTabs: React.Dispatch<React.SetStateAction<string[]>>;
}
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const GraphicageOpenLinesTabs: React.FC<GraphicageOpenLinesTabsProps> = ({
  data,
  loading,
  lines,
  activeTabs,
  setActiveTabs,
}) => {
  const { line } = useParams();
  const navigate = useNavigate();

  const onEdit = (targetKey: any, action: "add" | "remove") => {
    if (action === "remove")
      setActiveTabs((prev) => prev.filter((tab) => tab !== targetKey));
  };

  const stops = (
    data
      ?.map((circulation) =>
        circulation?.parcours?.pointDeParcours?.map((p) => ({
          id: p?.desserte?.codeUIC,
          name: p?.desserte?.libelle23,
        })),
      )
      ?.flat() || []
  ).map((s, i) => ({ ...s, order: i }));

  const uniquestops = stops.filter(
    (v, i, a) => a.findIndex((t) => t.id === v.id) === i,
  );

  const linesData = data?.map((circulation) => ({
    id: circulation?.id,
    label: circulation?.numeroCommercial,
    color: getRandomColor(),
    stops: circulation?.parcours?.pointDeParcours
      ?.sort((a, b) => a.rang - b.rang)
      ?.map((p) => ({
        stopId: p?.desserte?.codeUIC,
        arrival: p?.arret?.arrivee?.horaire,
        departure: p?.arret?.depart?.horaire,
      })),
  }));

  return (
    <Tabs
      hideAdd
      size="small"
      onEdit={onEdit}
      type="editable-card"
      className="w-full h-full"
      activeKey={line || undefined}
      onChange={(key) =>
        navigate(__routes__.Graphicage.Details.replace(":line", key))
      }
    >
      {activeTabs.map((tab) => {
        const targetLine = lines.find((l) => l === tab);
        return (
          <Tabs.TabPane
            key={tab}
            tab={targetLine}
            className="pr-4 w-[calc(100vw-376px)] overflow-x-auto"
          >
            <GraphV2Demo />
            {/* <GraphicageChart lines={linesData} stops={uniquestops} /> */}
          </Tabs.TabPane>
        );
      })}
    </Tabs>
  );
};

export default GraphicageOpenLinesTabs;
