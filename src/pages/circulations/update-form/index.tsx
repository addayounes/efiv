import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import PageHeader from "@/components/page-header";
import type { ICirculationCourse } from "@/types/entity/circulation";
import { Button } from "antd";
import UpdateOperationalCirculationContent from "./content";

interface UpdateOperationlCirculationProps {}

const mockCirculation: ICirculationCourse = {
  date: "2025-11-13T00:00:00Z",
  destination: {
    codeUIC: "87686006",
    libelle12: "Paris Lyon",
    libelle23: "Paris Gare de Lyon",
  },
  origine: {
    codeUIC: "87723197",
    libelle12: "Lyon Part D.",
    libelle23: "Lyon Part Dieu",
  },
  marqueCommerciale: {
    id: "001",
    libelle: "Frecciarossa",
  },
  mode: "ferré",
  numeroCommercial: "7769",
  parcours: {
    pointDeParcours: [
      {
        arret: {
          arrivee: {
            horaire: "0001-01-01T00:00:00Z",
            suppressionDiffusable: true,
          },
          depart: {
            horaire: "2025-11-13T17:38:00Z",
            retardReel: 0,
            retardVoyageur: 0,
            suppressionDiffusable: true,
          },
          descenteInterdite: false,
          monteeInterdite: false,
        },
        desserte: {
          codeUIC: "87723197",
          libelle12: "Lyon Part D.",
          libelle23: "Lyon Part Dieu",
        },
        rang: 1,
        statuts: [
          {
            statut: "ajouté",
          },
        ],
        zoneEmbarquement: {},
      },
      {
        arret: {
          arrivee: {
            horaire: "2025-11-13T18:09:00Z",
            retardReel: 0,
            retardVoyageur: 0,
            suppressionDiffusable: true,
          },
          depart: {
            horaire: "2025-11-13T18:15:00Z",
            retardReel: 0,
            retardVoyageur: 0,
            suppressionDiffusable: true,
          },
          descenteInterdite: false,
          monteeInterdite: false,
        },
        desserte: {
          codeUIC: "87686667",
          libelle12: "Paris Bercy",
          libelle23: "Paris Bercy",
        },
        rang: 2,
        statuts: [
          {
            statut: "horaires modifiés",
          },
        ],
        zoneEmbarquement: {},
      },
      {
        arret: {
          arrivee: {
            horaire: "2025-11-13T19:33:00Z",
            retardReel: 0,
            retardVoyageur: 0,
            suppressionDiffusable: true,
          },
          depart: {
            horaire: "0001-01-01T00:00:00Z",
            suppressionDiffusable: true,
          },
          descenteInterdite: false,
          monteeInterdite: false,
        },
        desserte: {
          codeUIC: "87686006",
          libelle12: "Paris Lyon",
          libelle23: "Paris Gare de Lyon",
        },
        rang: 3,
        statuts: [
          {
            statut: "horaires modifiés",
          },
        ],
        zoneEmbarquement: {},
      },
    ],
  },
  partenaire: {
    id: "64534",
    nom: "IVGO",
    dateEnvoi: "2025-11-13T16:00:25Z",
  },
  serviceDeCourse: [
    {
      id: "S11",
    },
    {
      id: "S03",
    },
    {
      id: "S08",
    },
  ],
  sousMode: "train",
  statut: "prévue",
  transporteur: {
    id: "3216",
    libelle: "TRENITALIA FRANCE",
  },
  id: "Nzc2OTIwMjUxMTEzMzIxNkZlcnLDqQ==",
};

const UpdateOperationlCirculation: React.FC<
  UpdateOperationlCirculationProps
> = ({}) => {
  const { id } = useParams();
  const [circulationData, setCirculationData] =
    useState<ICirculationCourse | null>(null);

  useEffect(() => {
    if (!id) return;

    const getCirculationData = async () => {
      try {
        // Fetch circulation data by id

        setCirculationData(mockCirculation);
      } catch (error) {
        toast.error("Erreur lors du chargement des données de la circulation.");
      }
    };

    getCirculationData();
  }, [id]);

  return (
    <div className="bg-primary-bg">
      <PageHeader
        title={`Mise à jour de la circulation N° ${
          circulationData?.numeroCommercial || "-"
        }`}
      />

      <main className="px-6">
        <div className="flex flex-col shadow border border-gray-200  rounded h-[calc(100vh-88px)] bg-white">
          <div className="flex-1 overflow-y-auto">
            <UpdateOperationalCirculationContent
              circulation={circulationData!}
            />
          </div>
          <div className="flex justify-end border-t border-gray-200 p-4">
            <Button type="primary">Modifier</Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UpdateOperationlCirculation;
