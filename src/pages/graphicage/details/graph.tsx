import { dayjs } from "@/lib/dayjs";
import { useMemo, type JSX } from "react";
import { scaleTime, scaleLinear } from "d3-scale";
import { TIME_FORMAT } from "@/constants/date-format";

export type Stop = {
  id: string;
  name: string;
  order: number;
};

export type TrainStopTime = {
  stopId: string;
  arrival: string;
  departure: string;
};

export type TrainLine = {
  id: string;
  label?: string;
  color?: string;
  stops: TrainStopTime[];
};

type GraphicageProps = {
  width: number;
  height: number;
  stops: Stop[];
  lines: TrainLine[];
};

export function GraphicageGraph({
  width,
  height,
  stops,
  lines,
}: GraphicageProps) {
  const margin = { top: 30, right: 20, bottom: 40, left: 100 };

  // ---- Collect all times (arrival + departure) ----
  const allTimes = lines.flatMap((line) =>
    line.stops.flatMap((s) => [
      new Date(s.arrival).getTime(),
      new Date(s.departure).getTime(),
    ]),
  );

  const minTime = new Date(Math.min(...allTimes));
  const maxTime = new Date(Math.max(...allTimes));

  // ---- Scales ----
  const xScale = useMemo(
    () =>
      scaleTime()
        .domain([minTime, maxTime])
        .range([margin.left, width - margin.right]),
    [minTime, maxTime, width],
  );

  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain([0, stops.length - 1])
        .range([margin.top, height - margin.bottom]),
    [stops.length, height],
  );

  const stopIndex = useMemo(
    () => Object.fromEntries(stops.map((s) => [s.id, s.order])),
    [stops],
  );

  // ---- X axis ticks (every 30 minutes) ----
  const ticks = xScale.ticks(10);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height="100%"
      preserveAspectRatio="none"
    >
      {/* X AXIS */}
      {ticks.map((t, i) => {
        const x = xScale(t);
        return (
          <g key={i}>
            <line
              x1={x}
              x2={x}
              y1={margin.top}
              stroke="#f0f0f0"
              y2={height - margin.bottom}
            />
            <text
              x={x}
              fill="#666"
              fontSize={11}
              y={height - 15}
              textAnchor="middle"
            >
              {dayjs(t).format(TIME_FORMAT)}
            </text>
          </g>
        );
      })}

      {/* STOPS */}
      {stops.map((stop) => {
        const y = yScale(stop.order);
        return (
          <g key={stop.id}>
            <text
              y={y}
              fontSize={12}
              textAnchor="end"
              x={margin.left - 10}
              dominantBaseline="middle"
            >
              {stop.name}
            </text>
            <line
              y1={y}
              y2={y}
              stroke="#eee"
              x1={margin.left}
              x2={width - margin.right}
            />
          </g>
        );
      })}

      {/* TRAINS */}
      {lines.map((line) =>
        line.stops.map((stopTime, i) => {
          const y = yScale(stopIndex[stopTime.stopId]);

          const xArr = xScale(new Date(stopTime.arrival));
          const xDep = xScale(new Date(stopTime.departure));

          const elements: JSX.Element[] = [];

          // ---- Stationary (arrival -> departure) ----
          elements.push(
            <line
              y1={y}
              y2={y}
              x1={xArr}
              x2={xDep}
              strokeWidth={4}
              key={`${line.id}-dwell-${i}`}
              stroke={line.color ?? "#2563eb"}
            />,
          );

          // ---- Time labels (arrival / departure) ----
          elements.push(
            <text
              x={xArr}
              y={y - 6}
              fill="#333"
              fontSize={10}
              textAnchor="middle"
              key={`${line.id}-arr-label-${i}`}
            >
              {dayjs(stopTime.arrival).format(TIME_FORMAT)}
            </text>,
          );

          if (stopTime.departure !== stopTime.arrival) {
            elements.push(
              <text
                x={xDep}
                y={y - 6}
                fill="#333"
                fontSize={10}
                textAnchor="middle"
                key={`${line.id}-dep-label-${i}`}
              >
                {new Date(stopTime.departure).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </text>,
            );
          }

          // ---- Run to next stop ----
          const next = line.stops[i + 1];
          if (next) {
            const xNext = xScale(new Date(next.arrival));
            const yNext = yScale(stopIndex[next.stopId]);

            elements.push(
              <line
                y1={y}
                x1={xDep}
                x2={xNext}
                y2={yNext}
                strokeWidth={2}
                key={`${line.id}-run-${i}`}
                stroke={line.color ?? "#2563eb"}
              />,
            );
          }

          return elements;
        }),
      )}
    </svg>
  );
}
