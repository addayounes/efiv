import { Descriptions } from "antd";
import { useFormikContext } from "formik";
import StopsLine from "@/components/stops";
import CirculationBlade from "@/components/blade";
import InfoConjConfig from "./components/info-conj";
import { OnboardServices } from "@/constants/onboard-services";
import type { CreateCirculationDto } from "@/types/dto/create-circulation";

interface SummaryStepProps {}

const SummaryStep: React.FC<SummaryStepProps> = ({}) => {
  const { values } = useFormikContext<CreateCirculationDto>();

  return (
    <div className="flex">
      <div className="p-4 w-2/3 space-y-10">
        <CirculationBlade circulation={values} />
        <div>
          <Descriptions
            bordered
            column={2}
            size="small"
            title="Général"
            contentStyle={{ fontWeight: 600 }}
          >
            <Descriptions.Item label="N° commercial">
              {values.numeroCommercial ?? "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Nom commercial">
              {values.nomCommercial ?? "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Marque commercial">
              {values.marqueCommerciale ?? "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Ligne commercial">
              {values.ligneCommerciale ?? "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Mode">
              {values.mode ?? "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Sous-mode">
              {values.sousMode ?? "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Longueur">
              {values.longueur ?? "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Vide voyageur">
              {values.videVoyageur ? "Oui" : "Non"}
            </Descriptions.Item>
            <Descriptions.Item label="Course spéciale">
              {values.courseSpeciale ? "Oui" : "Non"}
            </Descriptions.Item>
            <Descriptions.Item label="Libellé course spéciale">
              {values.libelleCourseSpeciale ?? "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Service à bord">
              {values.serviceDeCourse?.length
                ? values.serviceDeCourse
                    .map(
                      (s) => OnboardServices.find((o) => o.value === s)?.label
                    )
                    .join(", ")
                : "N/A"}
            </Descriptions.Item>
          </Descriptions>
        </div>

        <div>
          <h4 className="font-medium mb-6">Informations conjoncturelles</h4>
          <InfoConjConfig viewMode />
        </div>
      </div>
      <div className="w-1/3 p-4 border-l border-gray-200">
        <StopsLine stops={values.parcours ?? []} />
      </div>
    </div>
  );
};

export default SummaryStep;
