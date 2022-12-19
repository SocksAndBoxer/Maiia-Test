import { Timeslot } from '@prisma/client';
import { AppointmentForm } from 'components/AppointmentForm/AppointmentForm';
import { formatDateRange } from 'utils/date';

type Props = {
  timeslots: Timeslot[];
  setStep: (step: '1' | '2' | '3') => void;
  setAppointment: React.Dispatch<React.SetStateAction<AppointmentForm>>;
  appointment: AppointmentForm;
};

const TimeslotStep: React.FC<Props> = ({
  appointment,
  setAppointment,
  setStep,
  timeslots,
}) => {
  const handleSelect = (
    event: React.SyntheticEvent<HTMLSelectElement, Event>,
  ): void => {
    setAppointment((prev: AppointmentForm) => {
      const selectedTimeslot = timeslots.find(
        (timeslot) =>
          timeslot.id === Number((event.target as HTMLInputElement).value),
      );

      return {
        ...prev,
        startDate: selectedTimeslot?.startDate,
        endDate: selectedTimeslot?.endDate,
        timeslotId: selectedTimeslot?.id,
      };
    });
  };
  return (
    <div>
      <label htmlFor="patient">Choose a patient:</label>
      <select
        defaultValue="none"
        value={appointment.timeslotId}
        onChange={(e) => handleSelect(e)}
        name="patient"
      >
        <option value="none" disabled hidden>
          Select an Option
        </option>
        {timeslots.map((timeslot: Timeslot) => (
          <option key={timeslot.id} value={timeslot.id}>
            {formatDateRange({
              from: timeslot.startDate,
              to: timeslot.endDate,
            })}
          </option>
        ))}
      </select>
      <button onClick={() => setStep('3')}>Suivant</button>
    </div>
  );
};

export default TimeslotStep;
