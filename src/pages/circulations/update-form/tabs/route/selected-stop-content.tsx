import type { PointDeParcour } from "@/types/entity/circulation";

interface RouteTabSelectedStopContentProps {
  stop: PointDeParcour;
}

const RouteTabSelectedStopContent: React.FC<
  RouteTabSelectedStopContentProps
> = ({ stop }) => {
  return (
    <div className="p-4">
      <h2 className="font-medium text-2xl">{stop?.desserte?.libelle23}</h2>
    </div>
  );
};

export default RouteTabSelectedStopContent;
