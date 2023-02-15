import type { FunctionComponent } from 'preact';

interface FormInputProps {
  label: string;
  value: string | number;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  placeholder?: string;
  optional?: boolean;
  error?: string;
  onChange: (e: Event) => void;
}

export const FormInput: FunctionComponent<FormInputProps> = ({
  label,
  value,
  type = 'text',
  placeholder,
  optional = false,
  error = '',
  onChange,
}) => {
  const errorCls = error ? 'border-error input-error text-error' : '';
  return (
    <div class={`m-auto form-control w-full max-w-md ${errorCls}`}>
      <label class="label">
        <span class={`label-text ${errorCls}`}>{label}</span>
        {optional && <span class={`label-text-alt ${errorCls}`}>(Optional)</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        class={`input input-bordered w-full max-w-md ${errorCls}`}
        value={value}
        onInput={onChange}
      />
      <label class="label">
        {error && <span class={`label-text-alt ${errorCls}`}>{error}</span>}
      </label>
    </div>
  );
};
