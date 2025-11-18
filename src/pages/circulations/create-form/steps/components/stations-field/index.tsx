import { Field } from "formik";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import Select from "@/components/formik/select";
import { useStations } from "@/hooks/use-stations";
import { mapStations, type StopDto } from "@/services/ref";
import { Select as AntSelect, type SelectProps } from "antd";

const StationsField: React.FC<any> = ({ ...props }) => {
  const [stationSearchKeyword, setStationSearchKeyword] = useState("");
  const { stations, loading } = useStations(stationSearchKeyword);

  return (
    <Field
      labelInValue
      showSearch
      loading={loading}
      filterOption={false}
      autoClearSearchValue
      searchValue={stationSearchKeyword}
      onSearch={(value: string) => setStationSearchKeyword(value)}
      notFoundContent={
        loading ? <Loader className="animate-spin" /> : "Aucun résultat"
      }
      allowClear
      as={Select}
      options={mapStations(stations)}
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

  return (
    <AntSelect
      showSearch
      allowClear
      labelInValue
      value={value}
      loading={loading}
      filterOption={false}
      autoClearSearchValue
      options={mapStations(stations)}
      searchValue={stationSearchKeyword}
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
