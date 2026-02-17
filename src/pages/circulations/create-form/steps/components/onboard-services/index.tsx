import { Field } from "formik";
import Select from "@/components/formik/select";
import FormGroupTitle from "@/components/group-title";
import { OnboardServices as OnboardServicesOptions } from "@/constants/onboard-services";

interface OnboardServicesProps {}

const OnboardServices: React.FC<OnboardServicesProps> = ({}) => {
  return (
    <div>
      <div className="mb-4">
        <FormGroupTitle>Services à bord</FormGroupTitle>
      </div>
      <div>
        <Field
          allowClear
          as={Select}
          mode="multiple"
          className="w-full"
          name="serviceDeCourse"
          label="Service à bord"
          options={OnboardServicesOptions}
          placeholder="Sélectionner le service à bord"
        />
      </div>
    </div>
  );
};

export default OnboardServices;
