import { cn } from "@/utils/cn";
import { ArrowLeft } from "lucide-react";
import type { Composition } from "@/types/dto/create-circulation";

interface CompositionPreviewProps {
  size?: "small" | "medium" | "large";
  showDetails?: boolean;
  composition: Composition;
}

const SIZE_CLASSES = {
  small: {
    car: "w-7 h-4 text-xs",
    headGlass: "w-1 h-2",
    arrow: 14,
  },
  medium: {
    car: "w-10 h-6 text-base",
    headGlass: "w-2 h-4",
    arrow: 22,
  },
  large: {
    car: "w-16 h-10 text-lg",
    headGlass: "w-3 h-6",
    arrow: 30,
  },
};

const CompositionPreview: React.FC<CompositionPreviewProps> = ({
  composition,
  size = "small",
  showDetails = false,
}) => {
  return (
    <div>
      {composition.materielRoulant.length ? (
        <div className="flex items-center justify-center gap-2 w-full">
          <ArrowLeft
            className={cn("text-primary", { "-translate-y-4.5": showDetails })}
            size={SIZE_CLASSES[size].arrow}
          />
          {composition.materielRoulant?.map((mr, index) => (
            <div key={index} className="flex flex-col gap-4 items-center">
              <div className="flex items-center gap-1 group/innertrain">
                {mr.elementMaterielRoulant.map((el, elIndex) => {
                  const isHead = elIndex === 0;
                  const isTail =
                    elIndex === mr.elementMaterielRoulant.length - 1;
                  return (
                    <div
                      key={elIndex}
                      className="relative flex items-center gap-1 group/car"
                    >
                      <button
                        type="button"
                        className={cn(
                          "flex items-center justify-center overflow-hidden",
                          isHead
                            ? "bg-primary text-white relative rounded-tl-[44px] rounded-bl-2xl"
                            : isTail
                            ? "bg-primary text-white relative rounded-tr-[44px] rounded-br-2xl"
                            : "bg-primary/15",
                          SIZE_CLASSES[size].car
                        )}
                      >
                        <p className="font-medium">{el.libelle}</p>

                        {(isHead || isTail) && (
                          <span
                            className={cn(
                              "absolute rounded-full z-50 bg-white",
                              SIZE_CLASSES[size].headGlass,
                              isHead
                                ? "rotate-[40deg] left-0.5 top-0"
                                : isTail
                                ? "rotate-[-40deg] right-0.5 top-0"
                                : ""
                            )}
                          />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {showDetails && (
                <div className="font-medium flex items-center gap-6 text-sm">
                  {[mr.serie, mr.sousSerie, mr.sousSerie2]
                    .filter(Boolean)
                    .join(" - ")}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        "N/A"
      )}
    </div>
  );
};

export default CompositionPreview;
