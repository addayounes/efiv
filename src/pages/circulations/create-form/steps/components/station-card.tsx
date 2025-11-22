import { dayjs } from "@/lib/dayjs";
import { Trash2 } from "lucide-react";
import { useFormikContext } from "formik";
import StationsField from "./stations-field";
import StepsGeneralTab from "./stops/general";
import InfoConjoncturelle from "./stops/info-conj";
import { Button, Collapse, Popconfirm, Tabs, Tag } from "antd";
import type { CreateCirculationDto } from "@/types/dto/create-circulation";

interface StationCardProps {
  index: number;
}

const StationCard: React.FC<StationCardProps> = ({ index }) => {
  const { values, setFieldValue } = useFormikContext<CreateCirculationDto>();

  const isOrigin = index === 0;
  const currentStation = values.parcours?.[index];
  const isDestination = index === values.parcours?.length - 1;

  const tagLabel = isOrigin
    ? "Origine"
    : isDestination
    ? "Destination"
    : "Passage";

  const deleteStop = () => {
    setFieldValue(
      "parcours",
      values.parcours?.filter((_, i) => i !== index)
    );
  };

  const handleStationChange = (option: any) => {
    if (index === 0) setFieldValue("origin", option?.value);
    else if (index === values.parcours?.length - 1)
      setFieldValue("destination", option?.value);
  };

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <Collapse>
          <Collapse.Panel
            key={index}
            header={
              <div className="flex items-center justify-between cursor-pointer">
                <div
                  className="flex items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="font-medium w-6 h-6 rounded-full text-primary flex items-center justify-center">
                    {index + 1}
                  </span>
                  <StationsField
                    size="small"
                    className="min-w-[350px]"
                    placeholder="Choisir une gare"
                    onChange={handleStationChange}
                    name={`parcours.${index}.station`}
                  />
                  <div className="min-w-[85px] font-medium">
                    {[
                      currentStation.arrivee?.horaire,
                      currentStation.depart?.horaire,
                    ]
                      .filter(Boolean)
                      .map((_) => dayjs(_).format("HH:mm"))
                      .join(" - ")}
                  </div>
                </div>

                <Tag
                  className="font-medium"
                  color={isDestination || isOrigin ? "#003366" : "gray"}
                >
                  {tagLabel}
                </Tag>
              </div>
            }
          >
            <div className="overflow-hidden transition-all ease-in-out duration-500 ">
              <Tabs size="small" type="card">
                <Tabs.TabPane
                  key="1"
                  tab={<p className="text-sm font-medium">Général</p>}
                >
                  <StepsGeneralTab index={index} />
                </Tabs.TabPane>

                <Tabs.TabPane
                  key="2"
                  tab={<p className="text-sm font-medium">Composition</p>}
                ></Tabs.TabPane>

                <Tabs.TabPane
                  key="3"
                  tab={
                    <p className="text-sm font-medium">Info conjoncturelle</p>
                  }
                >
                  <InfoConjoncturelle index={index} />
                </Tabs.TabPane>
              </Tabs>
            </div>
          </Collapse.Panel>
        </Collapse>
      </div>

      {!(isDestination || isOrigin) && (
        <Popconfirm
          okText="Supprimer"
          cancelText="Annuler"
          onConfirm={deleteStop}
          title="Confirmer la suppression"
          okButtonProps={{ danger: true }}
          description="Êtes-vous sûr de vouloir supprimer cette desserte ?"
        >
          <Button
            type="text"
            className="mt-3"
            icon={<Trash2 className="text-gray-500 cursor-pointer" size={18} />}
          />
        </Popconfirm>
      )}
    </div>
  );
};

export default StationCard;
