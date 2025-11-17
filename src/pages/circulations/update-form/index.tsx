import {
  PointDeParcourStatut,
  type ICirculationCourse,
} from "@/types/entity/circulation";
import { Button, Popconfirm, Popover } from "antd";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "@/components/page-header";
import FormikForm from "@/components/formik/form";
import UpdateOperationalCirculationContent from "./content";
import type { FormikProps } from "formik";

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
          arrivee: {} as any,
          depart: {
            horaire: "2025-11-13T17:38:00Z",
            retardReel: 26,
            retardVoyageur: 0,
            suppressionDiffusable: true,
          },
          descenteInterdite: true,
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
            statut: PointDeParcourStatut.AJOUTE,
          },
        ],
        zoneEmbarquement: {},
      },
      {
        arret: {
          arrivee: {
            horaire: "2025-11-13T18:09:00Z",
            retardReel: 7,
            retardVoyageur: 0,
            suppressionDiffusable: true,
          },
          depart: {
            horaire: "2025-11-13T18:15:00Z",
            retardReel: 15,
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
            statut: PointDeParcourStatut.HORAIRES_MODIFIES,
          },
        ],
        zoneEmbarquement: {},
      },
      {
        arret: {
          arrivee: {
            horaire: "2025-11-13T01:33:00Z",
            retardReel: 0,
            retardVoyageur: 0,
            suppressionDiffusable: true,
          },
          depart: {
            horaire: "2025-11-13T02:33:00Z",
            retardReel: 0,
            retardVoyageur: 0,
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
            statut: PointDeParcourStatut.HORAIRES_MODIFIES,
          },
        ],
        zoneEmbarquement: {},
      },
      {
        arret: {
          arrivee: {
            horaire: "2025-11-13T19:33:00Z",
            retardReel: 126,
            retardVoyageur: 0,
            suppressionDiffusable: true,
          },
          depart: {} as any,
          descenteInterdite: false,
          monteeInterdite: true,
        },
        desserte: {
          codeUIC: "87686006",
          libelle12: "Paris Lyon",
          libelle23: "Paris Gare de Lyon",
        },
        rang: 4,
        statuts: [
          {
            statut: PointDeParcourStatut.HORAIRES_MODIFIES,
          },
          {
            statut: PointDeParcourStatut.SUPPRIME,
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

  const handleSubmitForm = async (data: ICirculationCourse) => {
    console.log("Form submitted with data:", data);
  };

  const deleteCirculation = async ({
    setFieldValue,
  }: FormikProps<ICirculationCourse>) => {
    try {
      const newParcours = (
        circulationData?.parcours?.pointDeParcours ?? []
      ).map((point) => ({
        ...point,
        statuts: [...point.statuts, { statut: PointDeParcourStatut.SUPPRIME }],
      }));

      setFieldValue("parcours.pointDeParcours", newParcours);
      setFieldValue("statut", PointDeParcourStatut.SUPPRIME);
    } catch (error) {
      console.log(error);
    }
  };

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
    <FormikForm
      withLoadingToast
      onSubmit={handleSubmitForm}
      initialValues={circulationData!}
      // validationSchema={CreateCirculationSchema}
    >
      {(formik) => {
        return (
          <div className="bg-primary-bg">
            <PageHeader
              title={`Mise à jour de la circulation N° ${
                circulationData?.numeroCommercial || "-"
              }`}
              rightComponent={
                <Popconfirm
                  okText="Supprimer"
                  cancelText="Annuler"
                  placement="bottomLeft"
                  title="Confirmer la suppression"
                  okButtonProps={{ danger: true }}
                  onConfirm={() => deleteCirculation(formik)}
                  description="Êtes-vous sûr de vouloir supprimer la circulation ?"
                >
                  <Button
                    danger
                    htmlType="button"
                    disabled={
                      formik.values?.statut == PointDeParcourStatut.SUPPRIME
                    }
                  >
                    Supprimer la circulation
                  </Button>
                </Popconfirm>
              }
            />

            <main className="px-6">
              <div className="flex flex-col shadow border border-gray-200  rounded h-[calc(100vh-88px)] bg-white">
                <div className="flex-1 overflow-y-auto">
                  <UpdateOperationalCirculationContent />
                </div>
                <div className="flex justify-end border-t border-gray-200 p-4">
                  <Button type="primary">Modifier</Button>
                </div>
              </div>
            </main>
          </div>
        );
      }}
    </FormikForm>
  );
};

export default UpdateOperationlCirculation;
