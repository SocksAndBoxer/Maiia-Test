import { Patient } from '@prisma/client';
import appointments from 'api/appointments';
import availabilities from 'api/availabilities';
import { AppointmentForm } from 'components/AppointmentForm/AppointmentForm';

type Props = {
  patients: Patient[];
  setStep: (step: '1' | '2' | '3') => void;
  setAppointment: React.Dispatch<React.SetStateAction<AppointmentForm>>;
  appointment: AppointmentForm;
};

const PatientStep: React.FC<Props> = ({
  patients,
  setAppointment,
  appointment,
  setStep,
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
      <label htmlFor="patient">Choose a patient:</label>
      <select
        defaultValue="none"
        value={appointment.patientId}
        onChange={(e) => handleSelect(e)}
        name="patient"
      >
        <option value="none" disabled hidden>
          Select an Option
        </option>
        {patients.map((patient: Patient) => (
          <option key={patient.id} value={patient.id}>
            {patient.lastName.toUpperCase()} {patient.firstName}{' '}
          </option>
        ))}
      </select>
      {appointment.practitionerId && (
        <button onClick={() => setStep('3')}>Suivant</button>
      )}
    </div>
  );
};

export default PatientStep;
