import {
  PointDeParcourStatut,
  type ICirculation,
} from "@/types/entity/circulation";
import toast from "react-hot-toast";
import { Button, Popconfirm } from "antd";
import type { FormikProps } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "@/components/page-header";
import FormikForm from "@/components/formik/form";
import UpdateOperationalCirculationContent from "./content";
import { fetchCirculationByIdService } from "@/services/circulations";
import Loading from "@/pages/loading";

interface UpdateOperationlCirculationProps {}

const UpdateOperationlCirculation: React.FC<
  UpdateOperationlCirculationProps
> = ({}) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [circulationData, setCirculationData] = useState<ICirculation | null>(
    null
  );

  const handleSubmitForm = async (data: ICirculation) => {
    console.log("Form submitted with data:", data);
  };

  const deleteCirculation = async ({
    setFieldValue,
  }: FormikProps<ICirculation>) => {
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
