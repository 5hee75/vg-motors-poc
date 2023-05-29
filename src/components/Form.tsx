import { useCallback, useState } from 'preact/hooks';
import type { FunctionComponent } from 'preact';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';

interface I_FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  vin: string;
  year: string;
  make: keyof typeof makeModels;
  model: string;
}

const years = [
  { value: '2023' },
  { value: '2022' },
  { value: '2021' },
  { value: '2020' },
  { value: '2019' },
  { value: '2018' },
  { value: '2017' },
];
const makes: { value: keyof typeof makeModels }[] = [
  { value: 'Chevrolet' },
  { value: 'Ford' },
  { value: 'Toyota' },
  { value: 'Honda' },
  { value: 'Nissan' },
];

const makeModels = {
  '': [{ value: '' }],
  Chevrolet: [{ value: 'Silverado' }],
  Ford: [{ value: 'F-150' }],
  Toyota: [{ value: 'Tacoma' }],
  Honda: [{ value: 'Civic' }],
  Nissan: [{ value: 'Altima' }],
};
const models = [
  { value: 'Silverado' },
  { value: 'F-150' },
  { value: 'Tacoma' },
  { value: 'Civic' },
  { value: 'Altima' },
];

export const Form: FunctionComponent = ({ children }) => {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<I_FormValues>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    vin: '',
    year: '',
    make: '',
    model: '',
  });

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (step === 0) {
        setStep(1);
      } else {
        console.log('Submit', values);
      }
    },
    [setStep, step, values]
  );

  const onReset = useCallback((e) => {
    e.preventDefault();
    setStep(0);
  }, []);

  const onInput = useCallback(
    (name: keyof I_FormValues) => (e) => {
      setValues((values) => ({ ...values, [name]: e.target.value }));
    },
    [setValues]
  );

  return (
    <form onSubmit={onSubmit} onReset={onReset} class="m-auto max-w-lg w-full">
      <div class={`swap swap-flip text-9xl w-full ${step === 1 ? 'swap-active' : ''}`}>
        <div class="swap-off w-screen px-4">
          <div class="m-auto w-full max-w-md pb-2">
            <h2 class="font-bold text-lg">Contact Info</h2>
          </div>
          <FormInput label="First Name" value={values['firstName']} onChange={onInput('firstName')} />
          <FormInput label="Last Name" value={values['lastName']} onChange={onInput('lastName')} />
          <FormInput type="email" label="Email" value={values['email']} onChange={onInput('email')} />
          <FormInput optional type="tel" label="Phone" value={values['phone']} onChange={onInput('phone')} />
        </div>
        <div class="swap-on w-screen px-4">
          <div class="m-auto w-full max-w-md flex justify-between items-center pb-2">
            <h2 class="font-bold text-lg">Vehicle Details</h2>
            <button class="btn gap-2 btn-ghost" onClick={onReset}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3"
                stroke="currentColor"
                viewBox="0 0 320 512"
                fill="currentColor">
                <path
                  stroke-width="2"
                  d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
                />
              </svg>
              back
            </button>
          </div>
          <FormInput label="VIN" value={values['vin']} onChange={onInput('vin')} />
          <div class="divider m-auto text-lg max-w-md">OR</div>
          <FormSelect label="Year" value={values['year']} options={years} onChange={onInput('year')} />
          <FormSelect
            label="Make"
            value={values['make']}
            options={makes}
            onChange={onInput('make')}
            disabled={!values['year']}
          />
          <FormSelect
            label="Model"
            value={values['model']}
            options={values['make'] ? makeModels[values['make']] : models}
            onChange={onInput('model')}
            disabled={!values['make']}
          />
        </div>
      </div>

      <div class="w-full p-8">
        {step === 0 ? (
          <button class="btn bg-primary btn-block" type="submit">
            Next
          </button>
        ) : (
          <a role="button" class="btn bg-primary btn-block" type="submit" href="/options">
            Submit
          </a>
        )}
      </div>
    </form>
  );
};
