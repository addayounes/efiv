import type {
  CreateCirculationDto,
  CreateCirculationApiPayload,
} from "@/types/dto/create-circulation";
import { CirculationStatus } from "@/constants/circulation-status";
import dayjs from "dayjs";

export const useCirculationMapper = () => {
  const mapCreateCirculationToDto = async (
    data: CreateCirculationDto
  ): Promise<CreateCirculationApiPayload> => {
    return {
      id: "-",
      date: dayjs(data.date).toISOString().split("T")[0],
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
        dateEnvoi: new Date().toISOString(),
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
          dateHeureDebutPublication: new Date(
            info.dateHeureDebutPublication
          ).toISOString(),
          dateHeureFinPublication: info?.dateHeureFinPublication
            ? new Date(info?.dateHeureFinPublication).toISOString()
            : undefined,
        })
      ),
      videVoyageur: data.videVoyageur,
      parcours: {
        pointDeParcours: (data.parcours ?? []).map((point, index) => {
          const arrivalDateTime = new Date(data.date!);
          if (point.arrivee?.horaire) {
            arrivalDateTime.setHours(
              new Date(point.arrivee?.horaire).getHours()
            );
            arrivalDateTime.setMinutes(
              new Date(point.arrivee?.horaire).getMinutes()
            );
          }
          const departureDateTime = new Date(data.date!);
          if (point.depart?.horaire) {
            departureDateTime.setHours(
              new Date(point.depart?.horaire).getHours()
            );
            departureDateTime.setMinutes(
              new Date(point.depart?.horaire).getMinutes()
            );
          }

          return {
            arret: {
              descenteInterdite: point.descenteInterdite,
              monteeInterdite: point.monteeInterdite,
              arrivee: point.arrivee?.horaire
                ? {
                    horaire: arrivalDateTime.toISOString(),
                    numeroSillon:
                      point.arrivee?.numeroSillon ?? data.numeroCommercial,
                  }
                : undefined,
              depart: point.depart?.horaire
                ? {
                    horaire: departureDateTime.toISOString(),
                    numeroSillon:
                      point.depart?.numeroSillon ?? data.numeroCommercial,
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
