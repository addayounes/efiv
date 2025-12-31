import type {
  ParcoursDto,
  CreateCirculationDto,
  CreateCirculationApiPayload,
} from "@/types/dto/create-circulation";
import { dayjs } from "@/lib/dayjs";
import { CirculationStatus } from "@/constants/circulation-status";
import { CirculationDateType } from "@/constants/circulation-date-types";

export const useCirculationMapper = () => {
  const mapStopComposition = (
    currentStop: ParcoursDto,
    previousStop: ParcoursDto | null
  ) => {
    const departureComposition = {
      materielRoulant: currentStop?.composition?.title?.materielRoulant!,
    };

    const arrivalComposition = previousStop
      ? currentStop?.composition?.value === previousStop?.composition?.value
        ? departureComposition
        : {
            materielRoulant: previousStop?.composition?.title?.materielRoulant!,
          }
      : departureComposition;

    return {
      departureComposition,
      arrivalComposition,
    };
  };

  const mapCreateCirculationToDto = async (
    data: CreateCirculationDto
  ): Promise<CreateCirculationApiPayload> => {
    const planningData =
      data.dateType == CirculationDateType.Calendar
        ? {
            calendar: {
              endDate: dayjs(data.endDate).format(),
              startDate: dayjs(data.startDate).format(),
              monthDays: data.monthDays ?? [],
              weeklyDays: data.weeklyDays ?? [],
              // TODO: update this to dateFrequency
              dateDateFrequency: data.dateFrequency?.toLowerCase(),
            },
          }
        : { date: dayjs(data.date).format().split("T")[0] };

    return {
      id: "-",
      ...planningData,
      destination: {
        codeUIC: data.destination?.value!,
        libelle12: data.destination?.title!,
        libelle23: data.destination?.label!,
      },
      longueur: data.longueur!,
      mode: data.mode!,
      nomCommercial: data.nomCommercial!,
      numeroCommercial: data.numeroCommercial!,
      origine: {
        codeUIC: data.origine?.value!,
        libelle12: data.origine?.title!,
        libelle23: data.origine?.label!,
      },
      ligneCommerciale: data.ligneCommerciale
        ? {
            id: data.ligneCommerciale!,
            libelle: data.ligneCommerciale,
          }
        : undefined,
      marqueCommerciale: data.marqueCommerciale
        ? {
            id: data.marqueCommerciale!,
            libelle: data.marqueCommerciale,
          }
        : undefined,
      partenaire: {
        id: "EFIV",
        nom: "EFIV",
        dateEnvoi: dayjs().toISOString(),
      },
      serviceDeCourse: (data.serviceDeCourse ?? []).map((service) => ({
        id: service,
      })),
      sousMode: data.sousMode!,
      statut: CirculationStatus.Prevue,
      transporteur: {
        id: "Transdev",
        libelle: "Transdev",
      },
      speciale: data.courseSpeciale
        ? {
            courseSpeciale: data.courseSpeciale,
            libelleCourseSpeciale: data.libelleCourseSpeciale,
          }
        : undefined,
      informationsConjoncturelles: data.informationsConjoncturelles.map(
        (info) => ({
          ...info,
          dateHeureDebutPublication: dayjs(
            info.dateHeureDebutPublication
          ).toISOString(),
          dateHeureFinPublication: info?.dateHeureFinPublication
            ? dayjs(info?.dateHeureFinPublication).toISOString()
            : undefined,
        })
      ),
      videVoyageur: data.videVoyageur,
      parcours: {
        pointDeParcours: (data.parcours ?? []).map((point, index) => {
          const arrivalDateTime = data.date ? new Date(data.date) : new Date();
          if (point.arrivee?.horaire) {
            arrivalDateTime.setHours(
              new Date(point.arrivee?.horaire).getHours()
            );
            arrivalDateTime.setMinutes(
              new Date(point.arrivee?.horaire).getMinutes()
            );
          }
          const departureDateTime = data.date
            ? new Date(data.date)
            : new Date();
          if (point.depart?.horaire) {
            departureDateTime.setHours(
              new Date(point.depart?.horaire).getHours()
            );
            departureDateTime.setMinutes(
              new Date(point.depart?.horaire).getMinutes()
            );
          }

          const previousPoint = index > 0 ? data.parcours[index - 1] : null;

          const { departureComposition, arrivalComposition } =
            mapStopComposition(point, previousPoint);

          return {
            arret: {
              descenteInterdite: point.descenteInterdite,
              monteeInterdite: point.monteeInterdite,
              arrivee: point.arrivee?.horaire
                ? {
                    horaire: arrivalDateTime.toISOString(),
                    numeroSillon:
                      point.arrivee?.numeroSillon ?? data.numeroCommercial,
                    composition: arrivalComposition,
                  }
                : undefined,
              depart: point.depart?.horaire
                ? {
                    horaire: departureDateTime.toISOString(),
                    numeroSillon:
                      point.depart?.numeroSillon ?? data.numeroCommercial,
                    composition: departureComposition,
                  }
                : undefined,
            },
            desserte: {
              codeUIC: point.station?.value!,
              libelle12: point.station?.title!,
              libelle23: point.station?.label!,
            },
            rang: index + 1,
            statuts: [],
            zoneEmbarquement: point.voieTransporteur
              ? { voieTransporteur: point.voieTransporteur }
              : undefined,
            informationsConjoncturelles: (
              point.informationsConjoncturelles ?? []
            ).map((info) => ({
              ...info,
              dateHeureDebutPublication: new Date(
                info.dateHeureDebutPublication
              ).toISOString(),
              dateHeureFinPublication: info?.dateHeureFinPublication
                ? new Date(info?.dateHeureFinPublication).toISOString()
                : undefined,
            })),
          };
        }),
      },
    };
  };

  return {
    mapCreateCirculationToDto,
  };
};
