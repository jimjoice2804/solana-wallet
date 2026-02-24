import type { ImportFieldProps } from '@/types/InputFieldProps';

const InputField = ({
  placeholder,
  onChange,
  value,
  style,
}: ImportFieldProps) => {
  return (
    <div>
      <div>
        <textarea
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          className={style}
        />
      </div>
    </div>
  );
};

export default InputField;
