import { useState } from 'react';
import { Appointment, Patient, Practitioner, Timeslot } from '@prisma/client';
import style from './AppointmentForm.module.scss';
import PractitionerStep from './components/PractitionerStep/PractitionerStep';
import PatientStep from './components/PatientStep/PatientStep';
import TimeslotStep from './components/TimeslotStep/TimeslotStep';
import { postAppointment } from 'store/appointments';

type Props = {
  timeslots: Timeslot[];
  patients: Patient[];
  practitioners: Practitioner[];
};

export type AppointmentForm = {
  patientId?: number;
  practitionerId?: number;
  timeslotId?: number;
  startDate?: Date;
  endDate?: Date;
};

type Steps = '1' | '2' | '3';

const AppointmentForm: React.FC<Props> = ({
  timeslots,
  patients,
  practitioners,
}) => {
  const [step, setStep] = useState<Steps>('1');
  const [appointment, setAppointment] = useState<AppointmentForm>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit', appointment);
    postAppointment(appointment as Appointment);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={style.AppointmentForm}
      action="appointment"
    >
      {step !== '1' && (
        <button
          onClick={() =>
            setStep((prevStep) => (Number(prevStep) - 1).toString() as Steps)
          }
        >
          Go back
        </button>
      )}
      {(() => {
        switch (step) {
          case '1':
            return (
              <PractitionerStep
                setStep={setStep}
                setAppointment={setAppointment}
                appointment={appointment}
                practitioners={practitioners}
              />
            );
          case '2':
            return (
              <PatientStep
                setStep={setStep}
                setAppointment={setAppointment}
                appointment={appointment}
                patients={patients}
              />
            );
          case '3':
            return (
              <TimeslotStep
                setStep={setStep}
                setAppointment={setAppointment}
                appointment={appointment}
                timeslots={timeslots.filter(
                  (timeslots) =>
                    timeslots.practitionerId === appointment.practitionerId,
                )}
              />
            );
          default:
            return <></>;
        }
      })()}
      <div>
        <button>Confirm</button>
      </div>
    </form>
  );
};

export default AppointmentForm;
