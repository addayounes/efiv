import React from "react";
import StopItem from "./stop-item";
import type { ParcoursDto } from "../../types/dto/create-circulation";

interface StopsLineProps {
  stops: ParcoursDto[];
}

const StopsLine: React.FC<StopsLineProps> = ({ stops }) => {
  return (
    <div className="flex flex-col p-8">
      {stops.map((stop, index) => (
        <StopItem
          key={index}
          stop={stop}
          isLast={index === stops.length - 1}
          isFirst={index === 0}
        />
      ))}
    </div>
  );
};

export default StopsLine;
