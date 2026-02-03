import GraphicageOpenLinesTabs from "./open-tabs";

interface GraphicageDetailsProps {
  activeTabs: string[];
  setActiveTabs: React.Dispatch<React.SetStateAction<string[]>>;
}

const GraphicageDetails: React.FC<GraphicageDetailsProps> = ({
  activeTabs,
  setActiveTabs,
}) => {
  return (
    <div className="p-4">
      <GraphicageOpenLinesTabs
        activeTabs={activeTabs}
        setActiveTabs={setActiveTabs}
      />
    </div>
  );
};

export default GraphicageDetails;
