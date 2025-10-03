import { useField } from "formik";
import FieldError from "./field-error";
import { Select as AntSelect } from "antd";
import type { FieldInputProps } from "formik";

interface SelectProps extends FieldInputProps<any> {
  label?: string;
}

const Select: React.FC<SelectProps> = (props) => {
  const [field, meta, helpers] = useField(props);
  const error = meta.touched && meta.error ? meta.error : null;

  const id = `formik-select-${props.name}`;

  return (
    <div className="w-full">
      {props.label && (
        <label className="text-sm text-gray-700 font-medium" htmlFor={id}>
          {props.label}
        </label>
      )}

      <div>
        <AntSelect
          id={id}
          size="large"
          {...field}
          {...props}
          value={field.value}
          status={error ? "error" : ""}
          onChange={(value) => {
            helpers.setValue(value);
            props.onChange?.(value);
          }}
        />
      </div>

      {error && <FieldError>{error}</FieldError>}
    </div>
  );
};

export default Select;
