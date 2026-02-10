import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
  type ChartDataset,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
);

export type Stop = {
  id: string;
  name: string;
  order: number;
};

export type TrainStopTime = {
  stopId: string;
  arrival: string; // ISO
  departure: string; // ISO
};

export type TrainLine = {
  id: string;
  label?: string;
  color?: string;
  stops: TrainStopTime[];
};

type Props = {
  stops: Stop[];
  lines: TrainLine[];
};

export function GraphicageChart({ stops, lines }: Props) {
  const stopIndex = Object.fromEntries(stops.map((s) => [s.id, s.order]));

  // ---- Build datasets ----
  const datasets: ChartDataset<"line">[] = lines.map((line) => ({
    label: line.label ?? line.id,
    borderColor: line.color ?? "#2563eb",
    backgroundColor: line.color ?? "#2563eb",
    borderWidth: 2,
    pointRadius: 0,
    tension: 0,
    parsing: false,
    data: line.stops.flatMap((s) => [
      // arrival point
      {
        x: new Date(s.arrival).getTime(),
        y: stopIndex[s.stopId],
      },
      // departure point (same Y → horizontal dwell)
      {
        x: new Date(s.departure).getTime(),
        y: stopIndex[s.stopId],
      },
    ]),
  }));

  const data: ChartData<"line"> = { datasets };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    parsing: false,
    scales: {
      // x: {
      //   type: "time" as const,
      //   time: {
      //     unit: "minute",
      //     displayFormats: {
      //       minute: "HH:mm",
      //     },
      //   },
      //   ticks: {
      //     source: "auto",
      //   },
      // },
      x: {
        type: "time",
        time: {
          displayFormats: {
            minute: "HH:mm",
            hour: "HH:mm",
            day: "dd MMM",
          },
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 12,
        },
      },
      y: {
        type: "linear" as const,
        min: 0,
        max: stops.length - 1,
        ticks: {
          stepSize: 1,
          callback: (_t, value: number) => stops[value]?.name ?? "",
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        enabled: true,
        intersect: false,
        callbacks: {
          label: (ctx: any) => {
            const time = new Date(ctx.parsed.x).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            const stop = stops[ctx.parsed.y]?.name;
            return `${stop} – ${time}`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Line data={data} options={options} className="w-full h-full" />
    </div>
  );
}
