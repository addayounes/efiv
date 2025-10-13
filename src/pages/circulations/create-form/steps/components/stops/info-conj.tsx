import {
  INFO_CONJ_TYPE_OPTIONS,
  INFO_CONJ_CATEGORY_OPTIONS,
} from "@/constants/info-conj";
import React from "react";
import { Button } from "antd";
import { Trash2 } from "lucide-react";
import { Field, useFormikContext } from "formik";
import Table from "@/components/table";
import Select from "@/components/formik/select";
import TextArea from "@/components/formik/textarea";
import DateTimePicker from "@/components/formik/date-time";
import type { CreateCirculationDto } from "@/types/dto/create-circulation";

interface InfoConjoncturelleProps {
  index: number;
}

const InfoConjoncturelle: React.FC<InfoConjoncturelleProps> = ({ index }) => {
  const { values, setFieldValue } = useFormikContext<CreateCirculationDto>();

  const infos = values.parcours?.[index]?.informationsConjoncturelles || [];

  const handleAddInfoConj = () => {
    const newInfo = {
      categorie: undefined,
      typeInformation: undefined,
      texte: undefined,
    };

    setFieldValue(`parcours.${index}.informationsConjoncturelles`, [
      ...(values.parcours?.[index]?.informationsConjoncturelles || []),
      newInfo,
    ]);
  };

  const handleDeleteInfoConj = (infoIndex: number) => {
    setFieldValue(`parcours.${index}.informationsConjoncturelles`, [
      ...(values.parcours?.[index]?.informationsConjoncturelles || []).filter(
        (_v: any, i: number) => i !== infoIndex
      ),
    ]);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">
          Informations conjoncturelles ({infos.length ?? 0})
        </h2>
        <Button onClick={handleAddInfoConj} htmlType="button">
          Ajouter
        </Button>
      </div>

      <div className="mt-4">
        <Table
          data={infos}
          bordered
          size="small"
          scroll={infos.length ? { y: 300, x: 300 } : undefined}
          head={[
            {
              title: "Type",
              dataIndex: "type",
              key: "type",
              width: 200,
              render(_v, _r, infoIndex) {
                return (
                  <Field
                    allowClear
                    as={Select}
                    size="medium"
                    className="min-w-[170px]"
                    placeholder="Choisir un type"
                    options={INFO_CONJ_TYPE_OPTIONS}
                    name={`parcours.${index}.informationsConjoncturelles.${infoIndex}.typeInformation`}
                  />
                );
              },
            },
            {
              title: "Catégorie",
              dataIndex: "categorie",
              key: "categorie",
              width: 200,
              render(_v, _r, infoIndex) {
                return (
                  <Field
                    allowClear
                    as={Select}
                    size="medium"
                    className="min-w-[170px]"
                    placeholder="Choisir une catégorie"
                    options={INFO_CONJ_CATEGORY_OPTIONS}
                    name={`parcours.${index}.informationsConjoncturelles.${infoIndex}.categorie`}
                  />
                );
              },
            },
            {
              title: "Contenu",
              dataIndex: "texte",
              key: "texte",
              width: 200,
              render(_v, _r, infoIndex) {
                return (
                  <Field
                    rows={1}
                    size="medium"
                    as={TextArea}
                    placeholder="Texte"
                    className="min-w-[170px]"
                    name={`parcours.${index}.informationsConjoncturelles.${infoIndex}.texte`}
                  />
                );
              },
            },
            {
              title: "Date de début de publication",
              dataIndex: "dateHeureDebutPublication",
              key: "dateHeureDebutPublication",
              width: 200,
              render(_v, _r, infoIndex) {
                return (
                  <Field
                    showTime
                    size="medium"
                    as={DateTimePicker}
                    format="DD/MM/YYYY HH:mm"
                    className="min-w-[170px]"
                    name={`parcours.${index}.informationsConjoncturelles.${infoIndex}.dateHeureDebutPublication`}
                  />
                );
              },
            },
            {
              title: "Date de fin de publication",
              dataIndex: "dateHeureFinPublication",
              key: "dateHeureFinPublication",
              width: 200,
              render(_v, _r, infoIndex) {
                return (
                  <Field
                    showTime
                    size="medium"
                    as={DateTimePicker}
                    format="DD/MM/YYYY HH:mm"
                    className="min-w-[170px]"
                    name={`parcours.${index}.informationsConjoncturelles.${infoIndex}.dateHeureFinPublication`}
                  />
                );
              },
            },
            {
              title: "Actions",
              dataIndex: "actions",
              key: "actions",
              width: 80,
              render(_v, _r, infoIndex) {
                return (
                  <div>
                    <Button
                      type="text"
                      htmlType="button"
                      icon={<Trash2 size={16} />}
                      onClick={() => handleDeleteInfoConj(infoIndex)}
                    />
                  </div>
                );
              },
            },
          ]}
        />
      </div>
    </div>
  );
};

export default InfoConjoncturelle;
