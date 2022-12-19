import { Practitioner } from '@prisma/client';
import { AppointmentForm } from '../../AppointmentForm';

type Props = {
  practitioners: Practitioner[];
  setAppointment: React.Dispatch<React.SetStateAction<AppointmentForm>>;
  setStep: (step: '1' | '2' | '3') => void;
  appointment: AppointmentForm;
};

const PractitionerStep: React.FC<Props> = ({
  practitioners,
  setStep,
  setAppointment,
  appointment,
}) => {
  const handleSelect = (
    event: React.SyntheticEvent<HTMLSelectElement, Event>,
  ): void => {
    setAppointment((prev: AppointmentForm) => {
      return {
        ...prev,
        practitionerId: Number((event.target as HTMLInputElement).value),
      };
    });
  };

  return (
    <div>
      <label htmlFor="practitioner">Choose a practitioner:</label>
      <select
        defaultValue="none"
        onChange={(e) => handleSelect(e)}
        value={appointment.practitionerId}
        name="practitioner"
      >
        <option value="none" disabled hidden>
          Select an Option
        </option>
        {practitioners.map((practitioner: Practitioner) => (
          <option key={practitioner.id} value={practitioner.id}>
            {practitioner.lastName.toUpperCase()} {practitioner.firstName} -{' '}
            {practitioner.speciality}
          </option>
        ))}
      </select>
      <button onClick={() => setStep('2')}>Suivant</button>
    </div>
  );
};

export default PractitionerStep;
