import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GraphicageOpenLinesTabs from "./open-tabs";
import type { ICirculation } from "@/types/entity/circulation";
import { fetchCirculationByLineService } from "@/services/circulations";

interface GraphicageDetailsProps {
  lines: string[];
  activeTabs: string[];
  setActiveTabs: React.Dispatch<React.SetStateAction<string[]>>;
}

const GraphicageDetails: React.FC<GraphicageDetailsProps> = ({
  lines,
  activeTabs,
  setActiveTabs,
}) => {
  const { line } = useParams();
  const [lineData, setLineData] = useState<ICirculation[]>([]);
  const [loadingLineData, setLoadingLineData] = useState(false);

  useEffect(() => {
    if (!line || !activeTabs.includes(line)) return;
    const fetchLineData = async () => {
      try {
        setLoadingLineData(true);
        const nextWeek = new Date();
        nextWeek.setHours(nextWeek.getHours() + 4);
        const data = await fetchCirculationByLineService({
          endDate: nextWeek.toISOString(),
          startDate: new Date().toISOString(),
          ligneCommerciale: line,
          limit: 100,
        });
        setLineData(data);
      } catch (error) {
        console.error("Error fetching line data:", error);
        toast.error("Erreur lors de la récupération des données de la ligne.");
      } finally {
        setLoadingLineData(false);
      }
    };

    fetchLineData();
  }, [line, activeTabs]);

  return (
    <div className="p-4 w-full">
      <GraphicageOpenLinesTabs
        lines={lines}
        data={lineData}
        activeTabs={activeTabs}
        loading={loadingLineData}
        setActiveTabs={setActiveTabs}
      />
    </div>
  );
};

export default GraphicageDetails;
