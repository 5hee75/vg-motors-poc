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
  make: string;
  model: string;
}

const years = [
  { value: '2021' },
  { value: '2020' },
  { value: '2019' },
  { value: '2018' },
  { value: '2017' },
];
const makes = [
  { value: 'Ford' },
  { value: 'Chevrolet' },
  { value: 'Toyota' },
  { value: 'Honda' },
  { value: 'Nissan' },
];
const models = [
  { value: 'F-150' },
  { value: 'Silverado' },
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
          <div class="m-auto w-full max-w-md">
            <h2 class="h-10 font-bold text-lg">Contact Info</h2>
          </div>
          <FormInput
            label="First Name"
            value={values['firstName']}
            onChange={onInput('firstName')}
          />
          <FormInput label="Last Name" value={values['lastName']} onChange={onInput('lastName')} />
          <FormInput
            type="email"
            label="Email"
            value={values['email']}
            onChange={onInput('email')}
          />
          <FormInput
            optional
            type="tel"
            label="Phone"
            value={values['phone']}
            onChange={onInput('phone')}
          />
        </div>
        <div class="swap-on w-screen px-4">
          <div class="m-auto w-full max-w-md">
            <h2 class="h-10 font-bold text-lg">Vehicle Details</h2>
          </div>
          <FormInput label="VIN" value={values['vin']} onChange={onInput('vin')} />
          <div class="divider m-auto text-lg max-w-md">OR</div>
          <FormSelect
            label="Year"
            value={values['year']}
            options={years}
            onChange={onInput('year')}
          />
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
            options={models}
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
          <>
            <a role="button" class="btn bg-primary btn-block" type="submit" href="/loading">
              Submit
            </a>
            <button class="btn btn-block btn-outline mt-2" type="reset">
              Back
            </button>
          </>
        )}
      </div>
    </form>
  );
};
