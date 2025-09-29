import { Trash2 } from "lucide-react";
import CouplageTab from "./stops/couplage";
import StepsGeneralTab from "./stops/general";
import { Field, useFormikContext } from "formik";
import Select from "../../../../../components/formik/select";
import { Button, Collapse, Popconfirm, Tabs, Tag } from "antd";
import type { CreateCirculationDto } from "../../../../../types/dto/create-circulation";

interface StationCardProps {
  index: number;
}

const StationCard: React.FC<StationCardProps> = ({ index }) => {
  const { values, setFieldValue } = useFormikContext<CreateCirculationDto>();

  const isOrigin = index === 0;
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

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <Collapse>
          <Collapse.Panel
            key={index}
            showArrow={false}
            header={
              <div className="flex items-center justify-between cursor-pointer">
                <div
                  className="flex items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="font-medium w-6 h-6 rounded-full text-primary flex items-center justify-center">
                    {index + 1}
                  </span>
                  <Field
                    allowClear
                    as={Select}
                    size="medium"
                    className="min-w-[350px]"
                    name={`parcours.${index}.uic`}
                    placeholder="Choisir une gare"
                    options={[]}
                  />
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
                ></Tabs.TabPane>

                <Tabs.TabPane
                  key="4"
                  tab={<p className="text-sm font-medium">Couplage</p>}
                >
                  <CouplageTab index={index} />
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
