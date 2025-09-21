import { Collapse, Tabs, Tag } from "antd";
import StepsGeneralTab from "./stops/general";
import { Field, useFormikContext } from "formik";
import Select from "../../../../../components/formik/select";
import type { CreateCirculationDto } from "../../../../../types/dto/create-circulation";

interface StationCardProps {
  index: number;
}

const StationCard: React.FC<StationCardProps> = ({ index }) => {
  const { values } = useFormikContext<CreateCirculationDto>();

  const tagLabel =
    index === 0
      ? "Origine"
      : index === values.parcours?.length - 1
      ? "Destination"
      : "Passage";

  return (
    <div>
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

              <Tag className="font-medium" color="#003366">
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
                tab={<p className="text-sm font-medium">Info conjoncturelle</p>}
              ></Tabs.TabPane>

              <Tabs.TabPane
                key="4"
                tab={<p className="text-sm font-medium">Couplage</p>}
              ></Tabs.TabPane>
            </Tabs>
          </div>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};

export default StationCard;
