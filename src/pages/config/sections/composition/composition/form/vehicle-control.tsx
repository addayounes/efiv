import { Button } from "antd";
import { Trash2 } from "lucide-react";
import type { SelectedState } from ".";
import Table from "@/components/table";
import { Field, useFormikContext } from "formik";
import TextField from "@/components/formik/textfield";
import type { CreateComposition } from "@/types/dto/create-circulation";

interface VehicleControlProps {
  selected: SelectedState;
}

const VehicleControl: React.FC<VehicleControlProps> = ({ selected }) => {
  const { values, setFieldValue } = useFormikContext<CreateComposition>();

  const handleAddDoor = () => {
    const doors =
      values.materielRoulant[selected.train].elementMaterielRoulant[
        selected.car
      ].porte || [];

    setFieldValue(
      `materielRoulant.${selected.train}.elementMaterielRoulant.${selected.car}.porte`,
      [...doors, { position: 0 }]
    );
  };

  const handleDeleteDoor = (index: number) => {
    const doors =
      values.materielRoulant[selected.train].elementMaterielRoulant[
        selected.car
      ].porte || [];

    setFieldValue(
      `materielRoulant.${selected.train}.elementMaterielRoulant.${selected.car}.porte`,
      [...doors].filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex-1">
          <h4 className="text-sm text-gray-700 font-medium">Rang</h4>
          <p className="text-base">
            <span className="font-medium">{selected.car + 1}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Field
          disabled
          label="Type"
          as={TextField}
          placeholder="Type"
          name={`materielRoulant.${selected.train}.elementMaterielRoulant.${selected.car}.type`}
        />
        <Field
          label="Libellé"
          as={TextField}
          placeholder="Libellé"
          name={`materielRoulant.${selected.train}.elementMaterielRoulant.${selected.car}.libelle`}
        />
        <Field
          min={0}
          suffix="cm"
          type="number"
          as={TextField}
          label="Longueur"
          placeholder="Longueur"
          name={`materielRoulant.${selected.train}.elementMaterielRoulant.${selected.car}.longueur`}
        />
      </div>

      <div className="flex items-center justify-between mt-8">
        <h2 className="font-medium text-lg">Portes</h2>

        <Button onClick={handleAddDoor} htmlType="button" type="primary">
          Ajouter
        </Button>
      </div>
      <Table
        size="small"
        data={
          values.materielRoulant[selected.train].elementMaterielRoulant[
            selected.car
          ].porte
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
            width: "70%",
            render(_v, _r, doorIndex) {
              return (
                <Field
                  size="small"
                  as={TextField}
                  placeholder="Position"
                  // className="min-w-[170px]"
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

export default VehicleControl;
