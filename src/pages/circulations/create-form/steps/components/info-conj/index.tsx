import {
  InfoConjType,
  InfoConjCategory,
  TypeStatusLabelMap,
  CategoryStatusLabelMap,
  INFO_CONJ_TYPE_OPTIONS,
  INFO_CONJ_CATEGORY_OPTIONS,
} from "@/constants/info-conj";
import type {
  CreateCirculationDto,
  InformationsConjoncturelleDto,
} from "@/types/dto/create-circulation";
import { Button } from "antd";
import { dayjs } from "@/lib/dayjs";
import { Trash2 } from "lucide-react";
import Table from "@/components/table";
import Select from "@/components/formik/select";
import { Field, useFormikContext } from "formik";
import type { ColumnsType } from "antd/es/table";
import TextArea from "@/components/formik/textarea";
import FormGroupTitle from "@/components/group-title";
import { DATE_FORMAT } from "@/constants/date-format";
import DateTimePicker from "@/components/formik/date-time";

const InfoConjConfig: React.FC<{ viewMode?: boolean }> = ({ viewMode }) => {
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
      {!viewMode && (
        <div className="flex items-center justify-between">
          <FormGroupTitle>
            Informations conjoncturelles ({infos.length ?? 0})
          </FormGroupTitle>

          <Button onClick={handleAddInfoConj} htmlType="button" type="primary">
            Ajouter
          </Button>
        </div>
      )}

      <div className="mt-4">
        <Table
          bordered
          data={infos}
          size="middle"
          scroll={infos.length ? { y: 300, x: 300 } : undefined}
          head={(
            [
              {
                title: "Type",
                dataIndex: "typeInformation",
                key: "typeInformation",
                render(_v, _r, infoIndex) {
                  if (viewMode)
                    return (
                      TypeStatusLabelMap[_v as InfoConjType] || _v || "N/A"
                    );

                  return (
                    <Field
                      allowClear
                      as={Select}
                      className="min-w-[100px]"
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
                render(_v, _r, infoIndex) {
                  if (viewMode)
                    return (
                      CategoryStatusLabelMap[_v as InfoConjCategory] ||
                      _v ||
                      "N/A"
                    );

                  return (
                    <Field
                      allowClear
                      as={Select}
                      className="min-w-[100px]"
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
                ellipsis: viewMode,
                render(_v, _r, infoIndex) {
                  if (viewMode) return _v || "N/A";

                  return (
                    <Field
                      rows={1}
                      as={TextArea}
                      placeholder="Texte"
                      className="min-w-[100px]"
                      name={`informationsConjoncturelles.${infoIndex}.texte`}
                    />
                  );
                },
              },
              {
                title: "Date de début de publication",
                dataIndex: "dateHeureDebutPublication",
                key: "dateHeureDebutPublication",
                render(_v, _r, infoIndex) {
                  if (viewMode) return dayjs(_v).format(DATE_FORMAT) || "N/A";

                  return (
                    <Field
                      showTime
                      as={DateTimePicker}
                      format="DD/MM/YYYY HH:mm"
                      className="min-w-[100px]"
                      name={`informationsConjoncturelles.${infoIndex}.dateHeureDebutPublication`}
                    />
                  );
                },
              },
              {
                title: "Date de fin de publication",
                dataIndex: "dateHeureFinPublication",
                key: "dateHeureFinPublication",
                render(_v, _r, infoIndex) {
                  if (viewMode) return dayjs(_v).format(DATE_FORMAT) || "N/A";

                  return (
                    <Field
                      showTime
                      as={DateTimePicker}
                      format="DD/MM/YYYY HH:mm"
                      className="min-w-[100px]"
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
                  if (viewMode) return _v || "N/A";

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
            ] as ColumnsType<InformationsConjoncturelleDto>
          ).filter((c) => !viewMode || (c as any).dataIndex !== "actions")}
        />
      </div>
    </div>
  );
};

export default InfoConjConfig;
