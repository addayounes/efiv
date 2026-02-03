import { Tabs } from "antd";
import { linesData } from "../lines";
import { GraphicageGraph } from "./graph";
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
      type="editable-card"
      className="w-full h-full"
      activeKey={line || undefined}
      onChange={(key) =>
        navigate(__routes__.Graphicage.Details.replace(":line", key))
      }
    >
      {activeTabs.map((tab) => {
        const targetLine = linesData.find((l) => l.value === tab);
        return (
          <Tabs.TabPane className="pr-4" key={tab} tab={targetLine?.label}>
            <GraphicageGraph
              width={1200}
              height={600}
              stops={[
                { id: "A", name: "Paris", order: 0 },
                { id: "B", name: "Lyon", order: 1 },
                { id: "C", name: "Marseille", order: 2 },
                { id: "D", name: "Aix-en-Provence", order: 3 },
                { id: "E", name: "Nice", order: 4 },
              ]}
              lines={[
                {
                  id: "T1",
                  label: "Train 001",
                  color: "blue",
                  stops: [
                    {
                      stopId: "A",
                      arrival: "2026-01-15T08:00:00Z",
                      departure: "2026-01-15T08:15:00Z",
                    },
                    {
                      stopId: "B",
                      arrival: "2026-01-15T09:55:00Z",
                      departure: "2026-01-15T10:00:00Z",
                    },
                    {
                      stopId: "C",
                      departure: "2026-01-15T12:30:00Z",
                      arrival: "2026-01-15T12:30:00Z",
                    },
                    {
                      stopId: "D",
                      departure: "2026-01-15T14:00:00Z",
                      arrival: "2026-01-15T14:00:00Z",
                    },
                    {
                      stopId: "E",
                      departure: "2026-01-15T15:30:00Z",
                      arrival: "2026-01-15T15:30:00Z",
                    },
                    {
                      stopId: "D",
                      departure: "2026-01-15T17:10:00Z",
                      arrival: "2026-01-15T17:10:00Z",
                    },
                    {
                      stopId: "C",
                      departure: "2026-01-15T18:50:00Z",
                      arrival: "2026-01-15T18:50:00Z",
                    },
                    {
                      stopId: "B",
                      departure: "2026-01-15T19:30:00Z",
                      arrival: "2026-01-15T19:30:00Z",
                    },
                    {
                      stopId: "A",
                      departure: "2026-01-15T20:55:00Z",
                      arrival: "2026-01-15T20:55:00Z",
                    },
                  ],
                },
                {
                  id: "T2",
                  label: "Train 002",
                  color: "red",
                  stops: [
                    {
                      stopId: "A",
                      departure: "2026-01-15T09:00:00Z",
                      arrival: "2026-01-15T09:00:00Z",
                    },
                    {
                      stopId: "B",
                      departure: "2026-01-15T11:10:00Z",
                      arrival: "2026-01-15T11:10:00Z",
                    },
                    {
                      stopId: "C",
                      departure: "2026-01-15T13:20:00Z",
                      arrival: "2026-01-15T13:20:00Z",
                    },
                    {
                      stopId: "D",
                      departure: "2026-01-15T14:50:00Z",
                      arrival: "2026-01-15T14:50:00Z",
                    },
                    {
                      stopId: "E",
                      departure: "2026-01-15T16:00:00Z",
                      arrival: "2026-01-15T16:00:00Z",
                    },
                    {
                      stopId: "D",
                      departure: "2026-01-15T17:50:00Z",
                      arrival: "2026-01-15T17:50:00Z",
                    },
                    {
                      stopId: "C",
                      departure: "2026-01-15T18:20:00Z",
                      arrival: "2026-01-15T18:20:00Z",
                    },
                    {
                      stopId: "B",
                      departure: "2026-01-15T19:10:00Z",
                      arrival: "2026-01-15T19:10:00Z",
                    },
                    {
                      stopId: "A",
                      departure: "2026-01-15T20:00:00Z",
                      arrival: "2026-01-15T20:00:00Z",
                    },
                  ],
                },
              ]}
            />
          </Tabs.TabPane>
        );
      })}
    </Tabs>
  );
};

export default GraphicageOpenLinesTabs;
