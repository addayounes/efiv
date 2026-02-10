import Lines from "./lines";
import GraphicageDetails from "./details";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "@/components/page-header";
import { fetchAvaialbleLinesService } from "@/services/circulations";
import toast from "react-hot-toast";

interface GraphicageProps {}

const Graphicage: React.FC<GraphicageProps> = ({}) => {
  const { line } = useParams();
  const [lines, setLines] = useState<string[]>([]);
  const [loadingLines, setLoadingLines] = useState(false);
  const [activeTabs, setActiveTabs] = useState<string[]>([]);

  useEffect(() => {
    if (!line) return;
    setActiveTabs((prev) => {
      if (prev.includes(line)) return prev;
      return [...prev, line];
    });
  }, [line]);

  useEffect(() => {
    const fetchLines = async () => {
      try {
        setLoadingLines(true);
        const data = await fetchAvaialbleLinesService({});
        setLines(data);
      } catch (error) {
        console.error("Error fetching available lines:", error);
        toast.error("Erreur lors de la récupération des lignes disponibles.");
      } finally {
        setLoadingLines(false);
      }
    };

    fetchLines();
  }, []);

  return (
    <div>
      <PageHeader title="Graphicage" />
      <main className="flex border-t border-gray-200">
        <Lines
          lines={lines}
          loading={loadingLines}
          activeTabs={activeTabs}
          setActiveTabs={setActiveTabs}
        />
        <GraphicageDetails
          lines={lines}
          activeTabs={activeTabs}
          setActiveTabs={setActiveTabs}
        />
      </main>
    </div>
  );
};

export default Graphicage;
