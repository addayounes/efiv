import { Input } from "antd";
import { useField } from "formik";
import FieldError from "./field-error";
import type { FieldInputProps } from "formik";

interface TextAreaProps extends FieldInputProps<string> {}

const TextArea: React.FC<TextAreaProps> = (props) => {
  const [field, meta] = useField(props);
  const error = meta.touched && meta.error ? meta.error : null;

  return (
    <div>
      <div>
        <Input.TextArea
          {...field}
          size="large"
          {...props}
          status={error ? "error" : ""}
        />
      </div>
      {error && <FieldError>{error}</FieldError>}
    </div>
  );
};

export default TextArea;
