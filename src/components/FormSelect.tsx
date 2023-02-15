import type { FunctionComponent } from 'preact';

interface FormSelectProps {
  label: string;
  value: string | number;
  options: { value: string; label?: string }[];
  placeholder?: string;
  optional?: boolean;
  error?: string;
  onChange: (e: Event) => void;
  disabled?: boolean;
}

export const FormSelect: FunctionComponent<FormSelectProps> = ({
  label,
  value,
  placeholder,
  options,
  optional = false,
  error = '',
  onChange,
  disabled,
}) => {
  const errorCls = error ? 'border-error input-error text-error' : '';
  return (
    <div class={`m-auto form-control w-full max-w-md ${errorCls}`}>
      <label class="label">
        <span class="label-text">{label}</span>
        {optional && <span class={`label-text-alt ${errorCls}`}>(Optional)</span>}
      </label>
      <select
        title={label}
        value={value}
        onChange={onChange}
        class={`select select-bordered w-full max-w-md ${errorCls}`}
      >
        <option disabled selected>
          {placeholder || label}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </select>
      <label class="label">
        {error && <span class={`label-text-alt ${errorCls}`}>{error}</span>}
      </label>
    </div>
  );
};
