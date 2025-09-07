import { Input } from "antd";
import { useField } from "formik";
import type { FieldInputProps } from "formik";

interface TextAreaProps extends FieldInputProps<string> {}

const TextArea: React.FC<TextAreaProps> = (props) => {
  const [field, meta] = useField(props);
  const error = meta.touched && meta.error ? meta.error : null;

  return (
    <div>
      <Input.TextArea
        {...field}
        size="large"
        {...props}
        status={error ? "error" : ""}
      />
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
};

export default TextArea;
