import dayjs from "dayjs";
import { extent } from "d3-array";
import React, { useRef } from "react";
import { scaleTime, scaleLinear } from "d3-scale";

export type Station = {
  id: string;
  name: string;
  distanceFromStart: number;
};

export type StopTime = {
  stationId: string;
  time: string;
};

export type Journey = {
  id: string;
  lineId: string;
  color: string;
  stops: StopTime[];
  battementMinutes?: number;
};

export type GraphicageProps = {
  stations: Station[];
  journeys: Journey[];
  height?: number;
  hourWidth?: number;
  selectedLine?: string;
};

export const GraphicageV2: React.FC<GraphicageProps> = ({
  stations,
  journeys,
  height = 500,
  hourWidth = 200,
  selectedLine,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // --------------------
  // Time domain
  // --------------------
  const allTimes = journeys.flatMap((j) =>
    j.stops.map((s) => dayjs(s.time).toDate()),
  );

  const [minTime, maxTime] = extent(allTimes) as [Date, Date];

  const start = dayjs(minTime).startOf("hour");
  const end = dayjs(maxTime).add(1, "hour").startOf("hour");

  const totalHours = end.diff(start, "hour", true);
  const width = totalHours * hourWidth;

  const xScale = scaleTime()
    .domain([start.toDate(), end.toDate()])
    .range([0, width]);

  // --------------------
  // Y scale (distance-based)
  // --------------------
  const yScale = scaleLinear()
    .domain([0, Math.max(...stations.map((s) => s.distanceFromStart))])
    .range([40, height - 40]);

  const stationMap = Object.fromEntries(stations.map((s) => [s.id, s]));

  // --------------------
  // Grid (10 min ticks)
  // --------------------
  const gridTimes = [] as Date[];
  let t = start.clone();
  while (t.isBefore(end)) {
    gridTimes.push(t.toDate());
    t = t.add(10, "minute");
  }

  const stationPanelWidth = 150;

  return (
    <div ref={containerRef} className="w-full border flex">
      {/* Fixed left panel - Station names */}
      <div className="flex-shrink-0 border-r bg-white">
        <svg width={stationPanelWidth} height={height}>
          {/* Stations labels */}
          {stations.map((st) => (
            <g key={st.id}>
              <line
                x1={0}
                x2={stationPanelWidth}
                y1={yScale(st.distanceFromStart)}
                y2={yScale(st.distanceFromStart)}
                stroke="#bbb"
              />
              <text
                x={4}
                fontSize={12}
                y={yScale(st.distanceFromStart) - 4}
                className="fill-gray-700 font-medium"
              >
                {st.name}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Scrollable timeline panel */}
      <div className="flex-1 overflow-x-auto">
        <svg width={width} height={height} className="bg-white">
          {/* Vertical grid */}
          {gridTimes.map((time, i) => {
            const isHour = dayjs(time).minute() === 0;
            return (
              <g key={i}>
                <line
                  x1={xScale(time)}
                  x2={xScale(time)}
                  y1={0}
                  y2={height}
                  stroke={isHour ? "#555" : "#ddd"}
                  strokeWidth={isHour ? 2 : 1}
                />
                {isHour && (
                  <text
                    x={xScale(time) + 4}
                    y={14}
                    fontSize={12}
                    fontWeight="bold"
                  >
                    {dayjs(time).format("HH:mm")}
                  </text>
                )}
              </g>
            );
          })}

          {/* Station horizontal lines (for alignment) */}
          {stations.map((st) => (
            <line
              key={st.id}
              x1={0}
              x2={width}
              y1={yScale(st.distanceFromStart)}
              y2={yScale(st.distanceFromStart)}
              stroke="#bbb"
            />
          ))}

          {/* Journeys */}
          {journeys.map((journey) => {
            const points = journey.stops.map((stop) => ({
              x: xScale(dayjs(stop.time).toDate()),
              y: yScale(stationMap[stop.stationId].distanceFromStart),
              label: dayjs(stop.time).format("mm"),
            }));

            const lastStop = journey.stops[journey.stops.length - 1];
            const battementEnd = journey.battementMinutes
              ? dayjs(lastStop.time)
                  .add(journey.battementMinutes, "minute")
                  .toDate()
              : null;

            return (
              <g
                key={journey.id}
                className={
                  selectedLine
                    ? selectedLine === journey.color
                      ? "opacity-100"
                      : "opacity-25"
                    : ""
                }
              >
                {/* Polyline */}
                <polyline
                  fill="none"
                  strokeWidth={2}
                  stroke={journey.color}
                  points={points.map((p) => `${p.x},${p.y}`).join(" ")}
                />

                {/* Points */}
                {points.map((p, i) => (
                  <g key={i}>
                    <circle cx={p.x} cy={p.y} r={4} fill={journey.color} />
                    <text
                      x={p.x + 6}
                      y={p.y - 6}
                      fontSize={11}
                      fill={journey.color}
                    >
                      {p.label}
                    </text>
                  </g>
                ))}

                {/* Battement */}
                {battementEnd && journey.battementMinutes && (
                  <g>
                    <line
                      x1={xScale(dayjs(lastStop.time).toDate())}
                      x2={xScale(battementEnd)}
                      y1={yScale(
                        stationMap[lastStop.stationId].distanceFromStart,
                      )}
                      y2={yScale(
                        stationMap[lastStop.stationId].distanceFromStart,
                      )}
                      stroke={journey.color}
                      strokeWidth={3}
                      strokeDasharray="4 2"
                    />
                    <text
                      x={
                        (xScale(dayjs(lastStop.time).toDate()) +
                          xScale(battementEnd)) /
                        2
                      }
                      y={
                        yScale(
                          stationMap[lastStop.stationId].distanceFromStart,
                        ) - 8
                      }
                      fontSize={11}
                      fill={journey.color}
                      textAnchor="middle"
                      fontWeight="bold"
                    >
                      {journey.battementMinutes}min
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default GraphicageV2;
