import { Input } from "antd";
import { useField } from "formik";
import type { FieldInputProps } from "formik";

interface TextFieldProps extends FieldInputProps<string> {
  label?: string;
}

const TextField: React.FC<TextFieldProps> = (props) => {
  const [field, meta] = useField(props);
  const error = meta.touched && meta.error ? meta.error : null;

  const id = `formik-textfield-${props.name}`;

  return (
    <div className="w-full">
      {props.label && (
        <label className="text-sm text-gray-700 font-medium" htmlFor={id}>
          {props.label}
        </label>
      )}
      <Input
        id={id}
        size="large"
        {...field}
        {...props}
        status={error ? "error" : ""}
      />
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
};

export default TextField;
