import Lines from "./lines";
import GraphicageDetails from "./details";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "@/components/page-header";

interface GraphicageProps {}

const Graphicage: React.FC<GraphicageProps> = ({}) => {
  const { line } = useParams();
  const [activeTabs, setActiveTabs] = useState<string[]>([]);

  useEffect(() => {
    if (!line) return;
    setActiveTabs((prev) => {
      if (prev.includes(line)) return prev;
      return [...prev, line];
    });
  }, [line]);

  return (
    <div>
      <PageHeader title="Graphicage" />
      <main className="flex border-t border-gray-200">
        <Lines activeTabs={activeTabs} setActiveTabs={setActiveTabs} />
        <GraphicageDetails
          activeTabs={activeTabs}
          setActiveTabs={setActiveTabs}
        />
      </main>
    </div>
  );
};

export default Graphicage;
