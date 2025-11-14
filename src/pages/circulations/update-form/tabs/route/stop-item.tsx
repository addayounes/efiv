import {
  type PointDeParcour,
  PointDeParcourStatut,
} from "@/types/entity/circulation";
import dayjs from "dayjs";
import { cn } from "@/utils/cn";
import { TIME_FORMAT } from "@/constants/date-format";
import { minutesToDuration } from "@/utils/date.utils";
import { Radio } from "lucide-react";
import { Tooltip } from "antd";

interface UpdateRouteStopItemProps {
  index: number;
  stop: PointDeParcour;
  allStops: PointDeParcour[];
  selectedStop: PointDeParcour;
}

const UpdateRouteStopItem: React.FC<UpdateRouteStopItemProps> = ({
  stop,
  index,
  allStops,
  selectedStop,
}) => {
  const isOrigin = index === 0;
  const isDestination = index === (allStops?.length ?? 0) - 1;
  const isDeleted = stop.statuts?.find(
    (s) => s.statut === PointDeParcourStatut.SUPPRIME
  );

  const isDeletedDiffusable =
    (stop.arret?.arrivee?.suppressionDiffusable ||
      stop.arret?.depart?.suppressionDiffusable) &&
    isDeleted;

  return (
    <div
      key={stop?.rang}
      className={cn(
        "flex items-center justify-between pr-4 pl-3 py-2 rounded cursor-pointer border-l-6 border-l-transparent",
        selectedStop?.rang === stop?.rang
          ? "bg-primary-light border-l-primary"
          : "hover:bg-gray-100",
        !isOrigin && !isDestination ? "pl-10" : ""
      )}
    >
      <div>
        <p className="text-xs w-fit mb-1 text-primary">
          {isOrigin
            ? "Origine"
            : isDestination
            ? "Destination"
            : `Passage ${index}`}
        </p>
        <h4 className="text-base font-medium">{stop?.desserte?.libelle12}</h4>
      </div>
      <div className="flex items-center gap-4">
        {isDeleted && (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-xs font-medium">
            {isDeletedDiffusable && (
              <Tooltip title="Suppression diffusable en gare">
                <Radio size={14} />
              </Tooltip>
            )}
            Supprimé
          </span>
        )}

        <div className="flex flex-col items-end text-xs space-y-2 text-right font-medium">
          {stop?.arret?.arrivee?.horaire ? (
            <div className="flex items-center gap-2">
              {stop?.arret?.arrivee?.retardReel ? (
                <p className="px-1 text-xs text-orange-500 bg-orange-100 rounded-full">
                  +{minutesToDuration(stop?.arret?.arrivee?.retardReel)}
                </p>
              ) : (
                ""
              )}
              <p className="text-gray-700 text-sm">
                {dayjs(stop?.arret?.arrivee?.horaire).format(TIME_FORMAT)}
              </p>
            </div>
          ) : (
            ""
          )}

          {stop?.arret?.depart?.horaire ? (
            <div className="flex items-center gap-2">
              {stop?.arret?.depart?.retardReel ? (
                <p className="px-1 text-xs text-orange-500 bg-orange-100 rounded-full">
                  +{minutesToDuration(stop?.arret?.depart?.retardReel)}
                </p>
              ) : (
                ""
              )}
              <p className="text-gray-700 text-sm">
                {dayjs(stop?.arret?.depart?.horaire).format(TIME_FORMAT)}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateRouteStopItem;
