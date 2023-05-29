import type { FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';

interface OptionSelectCardProps {
  title: string;
  description: string;
  price: number;
  onClick?: (arg: { checked: boolean; price: number }) => void;
}

export const OptionSelectCard: FunctionComponent<OptionSelectCardProps> = ({ title, description, price, onClick }) => {
  const [checked, setChecked] = useState(false);

  const onOptionClick = () => {
    setChecked(!checked);
    onClick && onClick({ checked: !checked, price });
  };

  return (
    <div
      className={`card bg-base-100 shadow-xl w-[48rem] clickable ${checked ? 'border-primary border' : ''}`}
      onClick={onOptionClick}>
      <label>
        <div className="card-body flex flex-row justify-between items-center form-control">
          <div>
            <h1 className="card-title">{title}</h1>
            <p>{description}</p>
          </div>
          <div class="flex items-center gap-3">
            <div class={`font-semibold ${checked ? 'text-primary' : ''}`}>${price.toLocaleString('en-US')}</div>
            <input type="checkbox" checked={checked} className="checkbox checkbox-lg checkbox-primary" />
          </div>
        </div>
      </label>
    </div>
  );
};
