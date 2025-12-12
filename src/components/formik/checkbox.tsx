import { useField } from "formik";
import FieldError from "./field-error";
import type { FieldInputProps } from "formik";
import { Checkbox as AntdCheckbox } from "antd";
import type { CheckboxProps as AntdCheckboxProps } from "antd";

interface CheckboxProps extends FieldInputProps<string> {
  label?: string;
}

const Checkbox: React.FC<CheckboxProps & AntdCheckboxProps> = (props) => {
  const [field, meta] = useField(props);
  const error = meta.touched && meta.error ? meta.error : null;

  const id = `formik-checkbox-${props.name}`;

  return (
    <div className="w-full">
      {props.label && (
        <label className="text-sm text-gray-700 font-medium" htmlFor={id}>
          {props.label}
        </label>
      )}
      <div>
        <AntdCheckbox.Group id={id} {...field} {...props} />
      </div>
      {error && <FieldError>{error}</FieldError>}
    </div>
  );
};

export default Checkbox;
