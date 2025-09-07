import { useField } from "formik";
import { Switch as AntSwitch } from "antd";
import type { FieldInputProps } from "formik";

interface SwitchProps extends FieldInputProps<any> {
  label?: string;
}

const Switch: React.FC<SwitchProps> = (props) => {
  const [field, , helpers] = useField(props);

  const id = `formik-switch-${props.name}`;

  return (
    <div className="flex flex-col items-start gap-2">
      {props.label && (
        <label className="text-sm text-gray-700 font-medium" htmlFor={id}>
          {props.label}
        </label>
      )}
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
  );
};

export default Switch;
