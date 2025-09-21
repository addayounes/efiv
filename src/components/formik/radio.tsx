import { useField } from "formik";
import { Radio as AntdRadio } from "antd";
import type { FieldInputProps } from "formik";
import type { RadioProps as AntdRadioProps } from "antd";

interface RadioProps extends FieldInputProps<string> {
  label?: string;
}

const Radio: React.FC<RadioProps & AntdRadioProps> = (props) => {
  const [field, meta] = useField(props);
  const error = meta.touched && meta.error ? meta.error : null;

  const id = `formik-radio-${props.name}`;

  return (
    <div className="w-full">
      {props.label && (
        <label className="text-sm text-gray-700 font-medium" htmlFor={id}>
          {props.label}
        </label>
      )}
      <div>
        <AntdRadio.Group size="large" id={id} {...field} {...props} />
      </div>
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
};

export default Radio;
