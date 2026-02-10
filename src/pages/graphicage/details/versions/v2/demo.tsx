import { Slider } from "antd";
import { cn } from "@/utils/cn";
import GraphicageV2 from "./graph-v2";
import React, { useState } from "react";
import { generateMockData, VEHICLE_COLORS } from "./mock-data";

const GraphV2Demo: React.FC = () => {
  const [height, setHeight] = useState(500);
  const [hourWidth, setHourWidth] = useState(700);

  const [selectedLine, setSelectedLine] = useState<string | undefined>();

  const { journeys, stations } = generateMockData();

  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <p className="font-medium text-gray-500">Hauteur ({height}px)</p>
          <Slider
            min={300}
            max={700}
            value={height}
            onChange={(v) => setHeight(v)}
          />
        </div>
        <div className="flex-1">
          <p className="font-medium text-gray-500">
            Largeur ({hourWidth}px par heure)
          </p>
          <Slider
            min={300}
            max={900}
            value={hourWidth}
            onChange={(v) => setHourWidth(v)}
          />
        </div>
      </div>

      <div className="my-6 flex items-center gap-4">
        {VEHICLE_COLORS.map((c, i) => (
          <div
            key={i}
            style={{ backgroundColor: c }}
            onClick={() => setSelectedLine(selectedLine === c ? undefined : c)}
            className={cn(
              "w-16 rounded text-white flex items-center justify-center font-medium hover:brightness-90 cursor-pointer",
              selectedLine
                ? selectedLine === c
                  ? "opacity-100"
                  : "opacity-25"
                : "",
            )}
          >
            Ligne {i + 1}
          </div>
        ))}
      </div>

      <GraphicageV2
        height={height}
        stations={stations}
        journeys={journeys}
        hourWidth={hourWidth}
        selectedLine={selectedLine}
      />
    </div>
  );
};

export default GraphV2Demo;
