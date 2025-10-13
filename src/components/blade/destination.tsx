import { ChevronRightIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { sliceArray } from "@/utils/slice-array";
import { getLineColor } from "@/constants/line-ref";
import type { CreateCirculationDto } from "@/types/dto/create-circulation";

interface DestinationProps {
  circulation: CreateCirculationDto;
}

const Destination: React.FC<DestinationProps> = ({ circulation }) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        {circulation?.nomCommercial && circulation?.ligneCommerciale && (
          <p
            style={{
              backgroundColor: getLineColor(
                circulation?.ligneCommerciale as any
              ),
            }}
            className="text-[21px] text-white font-bold -mb-2 leading-11 flex items-center justify-center rounded px-2 select-none"
          >
            <span className="-mt-0.5">{circulation?.ligneCommerciale}</span>
          </p>
        )}
        <h2 className="text-[31.5px] text-white font-bold">
          {circulation?.destination?.label}
        </h2>
      </div>
      <StopsSlider circulation={circulation} />
    </div>
  );
};

const StopsSlider = ({
  circulation,
}: {
  circulation: CreateCirculationDto;
}) => {
  const [direction, setDirection] = useState<1 | -1>(1);
  const [stopChunkPointer, setStopChunkPointer] = useState(0);

  const stops = useMemo(() => {
    const slicedStops = circulation?.parcours?.slice(1, -1);
    return sliceArray(slicedStops || [], 2);
  }, [circulation]);

  useEffect(() => {
    if (stops.length <= 1) return;

    const interval = setInterval(() => {
      setStopChunkPointer((prev) => {
        if (prev === stops.length - 1) {
          setDirection(-1);
          return prev - 1;
        } else if (prev === 0) {
          setDirection(1);
          return prev + 1;
        } else return prev + direction;
      });
    }, 4600);

    return () => clearInterval(interval);
  }, [direction, stops]);

  if (stops.length === 0 || circulation?.parcours?.length === 2) {
    return <p className="text-blade-departure-accent text-[20px]">Direct</p>;
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-blade-departure-accent text-[20px]">Via</span>
      <div className="h-[39px] overflow-y-hidden">
        {stops?.map((stopsChunk, chunkIndex) => {
          return (
            <div
              key={chunkIndex}
              className="flex items-center ease-in-out duration-[800ms]"
              style={{
                transform: `translateY(-${stopChunkPointer * 39}px)`,
              }}
            >
              {stopsChunk?.map((stop, stopIndex) => {
                return (
                  <div className="flex items-center gap-2">
                    <p
                      key={stopIndex}
                      className="text-[25px] text-blade-departure-50"
                    >
                      {stop?.station?.label}
                    </p>
                    <ChevronRightIcon className="text-white" size={24} />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Destination;
