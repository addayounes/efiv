import { Field } from "formik";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { mapStations } from "@/services/ref";
import Select from "@/components/formik/select";
import { useStations } from "@/hooks/use-stations";

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

export default StationsField;
