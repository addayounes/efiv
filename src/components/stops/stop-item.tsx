import { useMemo } from "react";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";
import type { ParcoursDto } from "../../types/dto/create-circulation";

const StopItem: React.FC<{
  isLast?: boolean;
  isFirst?: boolean;
  stop: ParcoursDto;
}> = ({ stop, isFirst, isLast }) => {
  const stopDuration = useMemo(() => {
    if (stop.arrivee?.horaire && stop.depart?.horaire) {
      return (
        (new Date(stop.depart?.horaire).getTime() -
          new Date(stop.arrivee?.horaire).getTime()) /
        1000 /
        60
      );
    } else return null;
  }, [stop.arrivee?.horaire, stop.depart?.horaire]);

  return (
    <div className="flex items-start gap-4 relative w-full">
      {/* Time */}
      <div className="font-medium min-w-[60px] place-items-center -translate-y-1.5">
        <div className={cn("w-fit px-2 rounded-2xl text-white bg-primary")}>
          {(isFirst ? stop.depart?.horaire : stop.arrivee?.horaire)
            ? new Date(
                isFirst ? stop.depart?.horaire! : stop.arrivee?.horaire!
              ).toLocaleTimeString("fr-FR", {
                timeZone: "Europe/Paris",
                timeStyle: "short",
              })
            : "00:00"}
        </div>
      </div>

      {/* Timeline */}
      <div className="flex flex-col items-center relative">
        {/* Circle marker */}
        <div
          className={cn(
            "w-5 h-5 rounded-full z-10 flex items-center justify-center bg-primary"
          )}
        ></div>

        {/* Vertical line */}
        {!isLast && <div className="w-1 h-16 bg-primary"></div>}
      </div>

      {/* Station info */}
      <div className="flex justify-between flex-1">
        <div className="-translate-y-2">
          <div className="flex items-center gap-2">
            <h2 className="font-medium text-lg truncate">
              {stop?.station?.label ?? "Desserte inconnue"}
            </h2>
            <div></div>
          </div>
          <div className="flex items-center gap-2 mt-1">
            {stop?.voieTransporteur?.length && (
              <div className="min-w-4 h-6 px-2 flex items-center justify-center border bg-gray-600 border-gray-600 rounded text-white text-sm font-medium">
                {stop?.voieTransporteur}
              </div>
            )}
            {typeof stopDuration === "number" && (
              <div className="text-gray-800 text-sm">
                {stopDuration} min d'arrêt
              </div>
            )}
            {stop?.descenteInterdite && (
              <p className="flex items-center gap-1 text-sm font-medium text-red-500">
                <X size={16} />
                Descente interdite
              </p>
            )}
            {stop?.monteeInterdite && (
              <p className="flex items-center gap-1 text-sm font-medium text-red-500">
                <X size={16} />
                Montée interdite
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StopItem;
