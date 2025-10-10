import {
  INFO_CONJ_CATEGORY_OPTIONS,
  INFO_CONJ_TYPE_OPTIONS,
} from "../../../../../../constants/info-conj";
import { Button } from "antd";
import { Trash2 } from "lucide-react";
import { Field, useFormikContext } from "formik";
import Table from "../../../../../../components/table";
import Select from "../../../../../../components/formik/select";
import TextArea from "../../../../../../components/formik/textarea";
import FormGroupTitle from "../../../../../../components/group-title";
import DateTimePicker from "../../../../../../components/formik/date-time";
import type { CreateCirculationDto } from "../../../../../../types/dto/create-circulation";

const InfoConjConfig: React.FC = ({}) => {
  const { values, setFieldValue } = useFormikContext<CreateCirculationDto>();

  const infos = values.informationsConjoncturelles || [];

  const handleAddInfoConj = () => {
    const newInfo = {
      categorie: undefined,
      typeInformation: undefined,
      texte: undefined,
    };

    setFieldValue(`informationsConjoncturelles`, [
      ...(values.informationsConjoncturelles || []),
      newInfo,
    ]);
  };

  const handleDeleteInfoConj = (infoIndex: number) => {
    setFieldValue(`informationsConjoncturelles`, [
      ...(values.informationsConjoncturelles || []).filter(
        (_v: any, i: number) => i !== infoIndex
      ),
    ]);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <FormGroupTitle>
          Informations conjoncturelles ({infos.length ?? 0})
        </FormGroupTitle>

        <Button onClick={handleAddInfoConj} htmlType="button" type="primary">
          Ajouter
        </Button>
      </div>

      <div className="mt-4">
        <Table
          bordered
          data={infos}
          size="middle"
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
                    // size="medium"
                    className="min-w-[170px]"
                    placeholder="Choisir un type"
                    options={INFO_CONJ_TYPE_OPTIONS}
                    name={`informationsConjoncturelles.${infoIndex}.typeInformation`}
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
                    // size="medium"
                    className="min-w-[170px]"
                    placeholder="Choisir une catégorie"
                    options={INFO_CONJ_CATEGORY_OPTIONS}
                    name={`informationsConjoncturelles.${infoIndex}.categorie`}
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
                    // size="medium"
                    as={TextArea}
                    placeholder="Texte"
                    className="min-w-[170px]"
                    name={`informationsConjoncturelles.${infoIndex}.texte`}
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
                    // size="medium"
                    as={DateTimePicker}
                    format="DD/MM/YYYY HH:mm"
                    className="min-w-[170px]"
                    name={`informationsConjoncturelles.${infoIndex}.dateHeureDebutPublication`}
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
                    // size="medium"
                    as={DateTimePicker}
                    format="DD/MM/YYYY HH:mm"
                    className="min-w-[170px]"
                    name={`informationsConjoncturelles.${infoIndex}.dateHeureFinPublication`}
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

export default InfoConjConfig;
