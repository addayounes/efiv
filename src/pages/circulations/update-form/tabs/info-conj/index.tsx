import { useFormikContext } from "formik";
import type { ICirculationCourse } from "@/types/entity/circulation";

const UpdateOperationalConjInfoTab: React.FC = () => {
  const { values } = useFormikContext<ICirculationCourse>();
  return <div>UpdateOperationalConjInfoTab</div>;
};

export default UpdateOperationalConjInfoTab;
