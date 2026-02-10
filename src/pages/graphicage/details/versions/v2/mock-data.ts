import dayjs from "dayjs";

const START_TRIP = ["DEPOT", "S1", "S2", "S3", "S3B", "S4"];
const SHUTTLE_OUT = ["S1", "S2", "S3", "S3B", "S4"];
const SHUTTLE_RET = [...SHUTTLE_OUT].reverse();
const END_TRIP = [...START_TRIP].reverse();

const OFFSETS: any = {
  DEPOT: 0,
  S1: 6,
  S2: 15,
  S3: 25,
  S3B: 35,
  S4: 60,
};

const SHUTTLE_OFFSETS_OUT: any = {
  S1: 0,
  S2: 7,
  S3: 19,
  S3B: 29,
  S4: 54,
};

const SHUTTLE_OFFSETS_RET: any = {
  S4: 0,
  S3B: 13,
  S3: 25,
  S2: 39,
  S1: 54,
};

export const VEHICLE_COLORS = [
  "#e53935",
  "#1e88e5",
  "#43a047",
  "#fb8c00",
  "#8e24aa",
  "#00897b",
  "#f4511e",
  "#3949ab",
];

export const generateMockData = () => {
  const stations = [
    { id: "DEPOT", name: "Dépôt", distanceFromStart: 0 },
    { id: "S1", name: "Centre Ville", distanceFromStart: 37 },
    { id: "S2", name: "Université", distanceFromStart: 169 },
    { id: "S3", name: "Hôpital", distanceFromStart: 219 },
    { id: "S3B", name: "Stage", distanceFromStart: 299 },
    { id: "S4", name: "Terminus", distanceFromStart: 329 },
  ];

  const DATE = "2026-02-10";

  const SERVICE_START = dayjs(`${DATE}T09:00:00`);
  const SERVICE_END = dayjs(`${DATE}T17:00:00`);
  const BATTEMENT = 10;

  const journeys = [];
  let vehicleIndex = 0;
  let firstDeparture = SERVICE_START;

  while (firstDeparture.isBefore(SERVICE_START.add(80, "minute"))) {
    const vehicleId = `VEH-${vehicleIndex + 1}`;
    const color = VEHICLE_COLORS[vehicleIndex % VEHICLE_COLORS.length];

    let t = firstDeparture;

    // -------- START: DEPOT → S4 --------
    journeys.push({
      id: `${vehicleId}-START`,
      lineId: "T1",
      color,
      battementMinutes: BATTEMENT,
      stops: START_TRIP.map((stationId) => ({
        stationId,
        time: t.add(OFFSETS[stationId], "minute").toISOString(),
      })),
    });

    t = t.add(60 + BATTEMENT, "minute");

    // -------- SHUTTLE LOOP --------
    while (t.add(60, "minute").isBefore(SERVICE_END.subtract(60, "minute"))) {
      // S4 → S1
      journeys.push({
        id: `${vehicleId}-RET`,
        lineId: "T1",
        color,
        battementMinutes: BATTEMENT,
        stops: SHUTTLE_RET.map((stationId) => ({
          stationId,
          time: t.add(SHUTTLE_OFFSETS_RET[stationId], "minute").toISOString(),
        })),
      });

      t = t.add(54 + BATTEMENT, "minute");

      // S1 → S4
      journeys.push({
        id: `${vehicleId}-OUT`,
        lineId: "T1",
        color,
        battementMinutes: BATTEMENT,
        stops: SHUTTLE_OUT.map((stationId) => ({
          stationId,
          time: t.add(SHUTTLE_OFFSETS_OUT[stationId], "minute").toISOString(),
        })),
      });

      t = t.add(54 + BATTEMENT, "minute");
    }

    // -------- END: S4 → DEPOT --------
    journeys.push({
      id: `${vehicleId}-END`,
      lineId: "T1",
      color,
      stops: END_TRIP.map((stationId) => ({
        stationId,
        time: t.add(60 - OFFSETS[stationId], "minute").toISOString(),
      })),
    });

    firstDeparture = firstDeparture.add(10, "minute");
    vehicleIndex++;
  }

  return { stations, journeys };
};
