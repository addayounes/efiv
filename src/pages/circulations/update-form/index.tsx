import {
  PointDeParcourStatut,
  type ICirculation,
} from "@/types/entity/circulation";
import {
  createCirculationService,
  fetchCirculationByIdService,
} from "@/services/circulations";
import toast from "react-hot-toast";
import Loading from "@/pages/loading";
import { Button, Popconfirm } from "antd";
import type { FormikProps } from "formik";
import { useEffect, useState } from "react";
import { __routes__ } from "@/constants/routes";
import PageHeader from "@/components/page-header";
import FormikForm from "@/components/formik/form";
import { useNavigate, useParams } from "react-router-dom";
import UpdateOperationalCirculationContent from "./content";
import { CirculationStatus } from "@/constants/circulation-status";

interface UpdateOperationlCirculationProps {}

const UpdateOperationlCirculation: React.FC<
  UpdateOperationlCirculationProps
> = ({}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [circulationData, setCirculationData] = useState<ICirculation | null>(
    null
  );

  const handleSubmitForm = async (data: ICirculation) => {
    const result = await createCirculationService(data as any);

    if (!result)
      throw new Error("Erreur lors de la mise à jour de la circulation.");

    toast.success("Circulation mise à jour avec succès.");

    navigate(__routes__.Circulations.Operational);
  };

  const deleteCirculation = async ({
    setFieldValue,
  }: FormikProps<ICirculation>) => {
    try {
      const newParcours = (
        circulationData?.parcours?.pointDeParcours ?? []
      ).map((point) => ({
        ...point,
        statuts: [{ statut: PointDeParcourStatut.SUPPRIME }],
      }));

      setFieldValue("parcours.pointDeParcours", newParcours);
      setFieldValue("statut", CirculationStatus.Supprime);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelCirculationDeletion = async (
    formik: FormikProps<ICirculation>
  ) => {
    try {
      const newParcours = (formik?.values?.parcours?.pointDeParcours ?? []).map(
        (point) => ({
          ...point,
          statuts: point.statuts.filter(
            (s) => s.statut !== PointDeParcourStatut.SUPPRIME
          ),
        })
      );

      formik.setFieldValue("parcours.pointDeParcours", newParcours);
      formik.setFieldValue("statut", CirculationStatus.Prevue);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!id) return;

    const getCirculationData = async () => {
      try {
        setLoading(true);
        const data = await fetchCirculationByIdService(id);
        setCirculationData(data);
      } catch (error) {
        toast.error("Erreur lors du chargement des données de la circulation.");
      } finally {
        setLoading(false);
      }
    };

    getCirculationData();
  }, [id]);

  if (loading)
    return (
      <div className="h-screen flex items-center">
        <Loading />
      </div>
    );

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
                formik.values?.statut == CirculationStatus.Supprime ? (
                  <Button
                    type="primary"
                    htmlType="button"
                    onClick={() => cancelCirculationDeletion(formik)}
                  >
                    Annuler la suppression
                  </Button>
                ) : (
                  <Popconfirm
                    okText="Supprimer"
                    cancelText="Annuler"
                    placement="bottomLeft"
                    title="Confirmer la suppression"
                    okButtonProps={{ danger: true }}
                    onConfirm={() => deleteCirculation(formik)}
                    description="Êtes-vous sûr de vouloir supprimer la circulation ?"
                  >
                    <Button danger htmlType="button">
                      Supprimer la circulation
                    </Button>
                  </Popconfirm>
                )
              }
            />

            <main className="px-6">
              <div className="flex flex-col shadow border border-gray-200  rounded h-[calc(100vh-88px)] bg-white">
                <div className="flex-1 overflow-y-auto">
                  <UpdateOperationalCirculationContent />
                </div>
                <div className="flex justify-end gap-4 border-t border-gray-200 p-4">
                  <Button htmlType="submit">Enregistrer</Button>
                  <Button htmlType="submit" type="primary">
                    Enregistrer et publier
                  </Button>
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
