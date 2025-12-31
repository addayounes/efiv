import { Loader } from "lucide-react";
import React, { useState } from "react";
import Select from "@/components/formik/select";
import { Field, useFormikContext } from "formik";
import { useStations } from "@/hooks/use-stations";
import { mapStations, type StopDto } from "@/services/ref";
import { Select as AntSelect, type SelectProps } from "antd";
import type { CreateCirculationDto } from "@/types/dto/create-circulation";

const StationsField: React.FC<any> = ({ ...props }) => {
  const [stationSearchKeyword, setStationSearchKeyword] = useState("");
  const { stations, loading } = useStations(stationSearchKeyword);
  const { values } = useFormikContext<CreateCirculationDto>();

  const selectedStations =
    values.parcours?.map((stop) => stop.station?.value) || [];

  const filteredStations = stations.filter(
    (station) => !selectedStations.includes(station.id)
  );

  return (
    <Field
      showSearch
      allowClear
      as={Select}
      labelInValue
      loading={loading}
      filterOption={false}
      autoClearSearchValue
      searchValue={stationSearchKeyword}
      options={mapStations(filteredStations)}
      onSearch={(value: string) => setStationSearchKeyword(value)}
      notFoundContent={
        loading ? <Loader className="animate-spin" /> : "Aucun résultat"
      }
      {...props}
    />
  );
};

export const StationsFieldWithoutFormik: React.FC<
  {
    value: string | undefined;
    onStationChange: (value: StopDto) => void;
  } & SelectProps
> = ({ value, onStationChange, ...props }) => {
  const [stationSearchKeyword, setStationSearchKeyword] = useState("");
  const { stations, loading } = useStations(stationSearchKeyword);
  const { values } = useFormikContext<CreateCirculationDto>();

  const selectedStations =
    values.parcours?.map((stop) => stop.station?.value) || [];

  const filteredStations = stations.filter(
    (station) => !selectedStations.includes(station.id)
  );

  return (
    <AntSelect
      showSearch
      allowClear
      labelInValue
      value={value}
      loading={loading}
      filterOption={false}
      autoClearSearchValue
      searchValue={stationSearchKeyword}
      options={mapStations(filteredStations)}
      onSearch={(value: string) => setStationSearchKeyword(value)}
      notFoundContent={
        loading ? <Loader className="animate-spin" /> : "Aucun résultat"
      }
      {...props}
      onChange={(option) => {
        onStationChange(
          stations.find((station) => station.id === option?.value)!
        );
      }}
    />
  );
};

export default StationsField;
