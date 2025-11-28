import { cn } from "@/utils/cn";
import { ArrowLeft } from "lucide-react";
import type { Composition } from "@/types/dto/create-circulation";

interface CompositionPreviewProps {
  composition: Composition;
}

const CompositionPreview: React.FC<CompositionPreviewProps> = ({
  composition,
}) => {
  return (
    <div>
      {composition.materielRoulant.length ? (
        <div className="flex items-center justify-center gap-2 w-full">
          <ArrowLeft className="text-primary" size={14} />
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
                          "flex items-center justify-center w-7 h-4 overflow-hidden",
                          isHead
                            ? "bg-primary text-white relative rounded-tl-[44px] rounded-bl-2xl"
                            : isTail
                            ? "bg-primary text-white relative rounded-tr-[44px] rounded-br-2xl"
                            : "bg-primary/15"
                        )}
                      >
                        <p className="font-medium text-xs">{el.libelle}</p>

                        {(isHead || isTail) && (
                          <span
                            className={cn(
                              "absolute w-1 h-2 rounded-full z-50 bg-white",
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
