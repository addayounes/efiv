import { useField } from "formik";
import FieldError from "./field-error";
import { Switch as AntSwitch } from "antd";
import type { FieldInputProps } from "formik";

interface SwitchProps extends FieldInputProps<any> {
  label?: string;
  inline?: boolean;
}

const Switch: React.FC<SwitchProps> = (props) => {
  const [field, meta, helpers] = useField(props);
  const error = meta.touched && meta.error ? meta.error : null;

  const id = `formik-switch-${props.name}`;

  return (
    <div
      className={`flex gap-2 
      ${props.inline ? "flex-row items-center" : "flex-col items-start"}`}
    >
      {props.label && (
        <label className="text-sm text-gray-700 font-medium" htmlFor={id}>
          {props.label}
        </label>
      )}
      <div>
        <AntSwitch
          id={id}
          {...field}
          {...props}
          checked={field.value}
          onChange={(checked) => {
            helpers.setValue(checked);
            props.onChange?.(checked);
          }}
        />
      </div>

      {error && <FieldError>{error}</FieldError>}
    </div>
  );
};

export default Switch;
