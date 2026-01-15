import { Button } from "antd";
import { Trash2 } from "lucide-react";
import Table from "@/components/table";
import type { SelectedState } from ".";
import { Field, useFormikContext } from "formik";
import TextField from "@/components/formik/textfield";
import type { CreateComposition } from "@/types/dto/create-circulation";

interface DoorControlProps {
  selected: SelectedState;
}

const DoorControl: React.FC<DoorControlProps> = ({ selected }) => {
  const { values, setFieldValue } = useFormikContext<CreateComposition>();

  const handleAddDoor = () => {
    const doors =
      values?.materielRoulant?.[selected.train]?.elementMaterielRoulant?.[
        selected.car
      ]?.porte || [];

    setFieldValue(
      `materielRoulant.${selected.train}.elementMaterielRoulant.${selected.car}.porte`,
      [...doors, { position: 0 }]
    );
  };

  const handleDeleteDoor = (index: number) => {
    const doors =
      values?.materielRoulant?.[selected.train]?.elementMaterielRoulant?.[
        selected.car
      ]?.porte || [];

    setFieldValue(
      `materielRoulant.${selected.train}.elementMaterielRoulant.${selected.car}.porte`,
      [...doors].filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-medium text-lg">Portes</h2>
        <Button onClick={handleAddDoor} htmlType="button" type="primary">
          Ajouter
        </Button>
      </div>

      <Table
        size="middle"
        data={
          values?.materielRoulant?.[selected.train]?.elementMaterielRoulant?.[
            selected.car
          ]?.porte
        }
        head={[
          {
            title: "Rang",
            dataIndex: "rang",
            key: "rang",
            render(_v, _r, doorIndex) {
              return <b>{doorIndex + 1}</b>;
            },
          },
          {
            title: "Position",
            dataIndex: "texte",
            key: "texte",
            width: "50%",
            render(_v, _r, doorIndex) {
              return (
                <Field
                  suffix="cm"
                  size="middle"
                  as={TextField}
                  placeholder="Position"
                  name={`materielRoulant.${selected.train}.elementMaterielRoulant.${selected.car}.porte.${doorIndex}.position`}
                />
              );
            },
          },
          {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            width: "20%",
            render(_v, _r, infoIndex) {
              return (
                <div>
                  <Button
                    type="text"
                    htmlType="button"
                    icon={<Trash2 size={16} />}
                    onClick={() => handleDeleteDoor(infoIndex)}
                  />
                </div>
              );
            },
          },
        ]}
        bordered
      />
    </div>
  );
};

export default DoorControl;
