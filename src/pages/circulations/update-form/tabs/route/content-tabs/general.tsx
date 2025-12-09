import { Alert, Tooltip } from "antd";
import Switch from "@/components/formik/switch";
import { Field, useFormikContext } from "formik";
import { minutesToDuration } from "@/utils/date.utils";
import {
  PointDeParcourStatut,
  type ICirculation,
} from "@/types/entity/circulation";
import { CirculationStatus } from "@/constants/circulation-status";
import { Radio } from "lucide-react";

interface UpdateContentGeneralTabProps {
  index: number;
}

const UpdateContentGeneralTab: React.FC<UpdateContentGeneralTabProps> = ({
  index,
}) => {
  const { values } = useFormikContext<ICirculation>();

  const currentStop = values?.parcours?.pointDeParcours?.[index];

  const isTrainDeleted = values?.statut === CirculationStatus.Supprime;

  const motifRetardInterne =
    currentStop?.arret?.arrivee?.motifTransporteurAsync?.libelle ??
    currentStop?.arret?.depart?.motifTransporteurAsync?.libelle;

  const motifRetardVoyageur =
    currentStop?.arret?.arrivee?.motifVoyageur?.libelle ??
    currentStop?.arret?.depart?.motifVoyageur?.libelle;

  const suppressionDiffusable =
    currentStop?.arret?.arrivee?.suppressionDiffusable ??
    currentStop?.arret?.depart?.suppressionDiffusable;

  const motifSuppression = (currentStop?.statuts ?? []).find(
    (s) => s.statut === PointDeParcourStatut.SUPPRIME
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Général</h2>
      </div>

      <div className="flex gap-4">
        <div className="space-y-6">
          <div>
            <h4 className="text-sm text-gray-700 font-medium mb-1">Statuts</h4>
            <div className="flex items-center gap-2">
              {currentStop?.statuts?.length ? (
                currentStop?.statuts?.map((statut) => (
                  <p
                    key={statut.statut}
                    className="text-sm bg-primary text-white px-2 py-0.5 rounded-full font-medium capitalize"
                  >
                    {statut.statut}
                  </p>
                ))
              ) : (
                <p className="text-sm text-gray-500">Aucun statut</p>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-68">
              <h4 className="text-sm text-gray-700 font-medium mb-2">
                Retard à l'arrivée
              </h4>

              <div className="flex items-center gap-2">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Interne</p>
                  <p className="text-sm text-gray-500">Voyageur</p>
                </div>
                <div>
                  <p className="text-base text-orange-500">
                    <span className="font-medium">
                      +
                      {minutesToDuration(
                        currentStop?.arret?.arrivee?.retardReel ?? 0
                      )}
                    </span>
                  </p>

                  <p className="text-base text-orange-500">
                    <span className="font-medium">
                      +
                      {minutesToDuration(
                        currentStop?.arret?.arrivee?.retardVoyageur ?? 0
                      )}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="w-68">
              <h4 className="text-sm text-gray-700 font-medium mb-1">
                Retard au départ
              </h4>
              <div className="flex items-center gap-2">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Interne</p>
                  <p className="text-sm text-gray-500">Voyageur</p>
                </div>
                <div>
                  <p className="text-base text-orange-500">
                    <span className="font-medium">
                      +
                      {minutesToDuration(
                        currentStop?.arret?.depart?.retardReel ?? 0
                      )}
                    </span>
                  </p>

                  <p className="text-base text-orange-500">
                    <span className="font-medium">
                      +
                      {minutesToDuration(
                        currentStop?.arret?.depart?.retardVoyageur ?? 0
                      )}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <Field
              as={Switch}
              label="Montée interdite"
              name={`parcours.pointDeParcours.${index}.arret.monteeInterdite`}
              disabled={
                index === values.parcours?.pointDeParcours?.length - 1 ||
                isTrainDeleted
              }
            />
            <Field
              as={Switch}
              label="Descente interdite"
              disabled={index === 0 || isTrainDeleted}
              name={`parcours.pointDeParcours.${index}.arret.descenteInterdite`}
            />
            <Field
              disabled={isTrainDeleted}
              as={Switch}
              label="Inversion de composition"
              name={`parcours.pointDeParcours.${index}.arret.inversionComposition`}
            />
          </div>
        </div>

        <div className="pl-6 space-y-6 w-full">
          {motifSuppression?.motifTransporteur?.libelle && (
            <div>
              <h4 className="text-sm text-gray-700 font-medium mb-1">
                Motif de suppression
              </h4>
              <Alert
                type="error"
                style={{ padding: "8px 16px" }}
                description={
                  <p className="flex gap-2 items-center">
                    {suppressionDiffusable ? (
                      <div>
                        <Tooltip title="Suppression diffusable en gare">
                          <Radio size={14} className="text-red-500" />
                        </Tooltip>
                      </div>
                    ) : null}
                    {motifSuppression?.motifTransporteur?.libelle}
                  </p>
                }
              />
            </div>
          )}

          {motifRetardInterne && (
            <div>
              <h4 className="text-sm text-gray-700 font-medium mb-1">
                Motif de retard interne
              </h4>
              <Alert
                type="warning"
                style={{ padding: "8px 16px" }}
                description={motifRetardInterne}
              />
            </div>
          )}

          {motifRetardVoyageur && (
            <div>
              <h4 className="text-sm text-gray-700 font-medium mb-1">
                Motif de retard voyageur
              </h4>
              <Alert
                type="warning"
                style={{ padding: "8px 16px" }}
                description={motifRetardVoyageur}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateContentGeneralTab;
