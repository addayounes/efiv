import { dayjs } from "@/lib/dayjs";

export interface StopTimes {
  arrivee: dayjs.Dayjs | undefined;
  depart: dayjs.Dayjs | undefined;
}

export const getDisabledTimes = (
  times: StopTimes,
  prevDeparture: dayjs.Dayjs | null,
  nextArrival: dayjs.Dayjs | null
) => {
  return {
    arrivalDisabledTime: () => {
      return {
        disabledHours() {
          const disabled = new Set<number>();

          // 1- arrival must be <= departure
          if (times.depart) {
            for (let h = times.depart.hour() + 1; h < 24; h++) disabled.add(h);
          }

          // 2- arrival must be >= previousStop.departure
          if (prevDeparture) {
            for (let h = 0; h < prevDeparture.hour(); h++) disabled.add(h);
          }

          // 3 — arrival <= nextArrival
          if (nextArrival) {
            for (let h = nextArrival.hour() + 1; h < 24; h++) disabled.add(h);
          }

          return [...disabled];
        },

        disabledMinutes(hour: number) {
          const disabled = new Set<number>();

          // rule: arrival <= departure
          if (times.depart && hour === times.depart.hour()) {
            for (let m = times.depart.minute() + 1; m < 60; m++)
              disabled.add(m);
          }

          // rule: arrival >= prevDeparture
          if (prevDeparture && hour === prevDeparture.hour()) {
            for (let m = 0; m < prevDeparture.minute(); m++) disabled.add(m);
          }

          // 3 — arrival <= nextArrival
          if (nextArrival && hour === nextArrival.hour()) {
            for (let m = nextArrival.minute() + 1; m < 60; m++) disabled.add(m);
          }

          return [...disabled];
        },
      };
    },
    departureDisabledTime: () => {
      return {
        disabledHours() {
          const disabled = new Set<number>();

          // 1- departure must be >= arrival (your current rule)
          if (times.arrivee) {
            for (let h = 0; h < times.arrivee.hour(); h++) disabled.add(h);
          }

          // 2 — departure >= previous stop departure
          if (prevDeparture) {
            for (let h = 0; h < prevDeparture.hour(); h++) disabled.add(h);
          }

          // 3- departure must be <= nextStop.arrival
          if (nextArrival) {
            for (let h = nextArrival.hour() + 1; h < 24; h++) disabled.add(h);
          }

          return [...disabled];
        },

        disabledMinutes(hour: number) {
          const disabled = new Set<number>();

          // 1: departure >= arrival
          if (times.arrivee && hour === times.arrivee.hour()) {
            for (let m = 0; m < times.arrivee.minute(); m++) disabled.add(m);
          }

          // 2 — departure >= previous stop departure
          if (prevDeparture && hour === prevDeparture.hour()) {
            for (let m = 0; m < prevDeparture.minute(); m++) disabled.add(m);
          }

          // 3: departure <= nextArrival
          if (nextArrival && hour === nextArrival.hour()) {
            for (let m = nextArrival.minute() + 1; m < 60; m++) disabled.add(m);
          }

          return [...disabled];
        },
      };
    },
  };
};
