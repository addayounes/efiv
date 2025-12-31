import { Input } from "antd";
import { useField } from "formik";
import FieldError from "./field-error";
import type { FieldInputProps } from "formik";

interface TextAreaProps extends FieldInputProps<string> {
  label?: string;
  resizable?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({ resizable = true, ...props }) => {
  const [field, meta] = useField(props);
  const error = meta.touched && meta.error ? meta.error : null;

  const id = `formik-textarea-${props.name}`;

  return (
    <div className="w-full">
      {props.label && (
        <label className="text-sm text-gray-700 font-medium" htmlFor={id}>
          {props.label}
        </label>
      )}
      <div>
        <Input.TextArea
          {...field}
          {...props}
          size="large"
          status={error ? "error" : ""}
          style={{ resize: resizable ? "block" : "none" }}
        />
      </div>
      {error && <FieldError>{error}</FieldError>}
    </div>
  );
};

export default TextArea;
