import { useField } from "formik";
import { DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import type { FieldInputProps } from "formik";

interface DateTimePickerProps extends FieldInputProps<string> {
  label?: string;
}

const DateTimePicker: React.FC<DateTimePickerProps & DatePickerProps> = (
  props
) => {
  const [field, meta, helpers] = useField(props);
  const error = meta.touched && meta.error ? meta.error : null;

  const id = `formik-datetime-${props.name}`;

  return (
    <div className="w-full">
      {props.label && (
        <label className="text-sm text-gray-700 font-medium" htmlFor={id}>
          {props.label}
        </label>
      )}
      <div>
        <DatePicker
          id={id}
          {...field}
          {...props}
          needConfirm={false}
          status={error ? "error" : ""}
          onChange={(value) => helpers.setValue(value)}
        />
      </div>
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
};

export default DateTimePicker;
