import { useEffect, useState } from 'react';
import AppointmentForm from 'components/AppointmentForm/AppointmentForm';
import AppointmentList from 'components/AppointmentList/AppointmentList';
import {
  Availability,
  Patient,
  Practitioner,
  Appointment,
} from '@prisma/client';
import { AppointmentDetailed } from 'types/appointment';
import Section from 'components/Section';
import AllTasks from 'components/AllTasks';
import { appointmentsSelectors, getAppointments } from 'store/appointments';
import { patientsSelectors, getPatients } from 'store/patients';
import { practitionersSelectors, getPractitioners } from 'store/practitioners';
import {
  availabilitiesSelectors,
  getAvailabilities,
} from 'store/availabilities';
import { useAppSelector } from 'utils/hook';
import { useDispatch } from 'react-redux';
import Loader from 'Loader/Loader';

interface AppointmentData {
  appointments: Appointment[];
  availabilities: Availability[];
  practitioners: Practitioner[];
  patients: Patient[];
  isLoading: boolean;
}

const AppointmentsPage = () => {
  const [appointmentsDetailed, setAppointmentsDetailed] = useState<
    AppointmentDetailed[]
  >([]);
  const dispatch = useDispatch();
  const {
    appointments,
    patients,
    practitioners,
    availabilities,
    isLoading,
  }: AppointmentData = useAppSelector(
    ({ appointments, patients, practitioners, availabilities }) => {
      return {
        appointments: appointmentsSelectors.selectAll(appointments),
        practitioners: practitionersSelectors.selectAll(practitioners),
        availabilities: availabilitiesSelectors.selectAll(availabilities),
        patients: patientsSelectors.selectAll(patients),
        isLoading:
          appointments.loading ||
          practitioners.loading ||
          patients.loading ||
          availabilities.loading,
      };
    },
  );

  useEffect(() => {
    dispatch(getAppointments());
    dispatch(getPatients());
    dispatch(getPractitioners());
    dispatch(getAvailabilities());
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // Add patient's and practitioner's details to the appointment object
      const updatedAppointments = appointments.map(
        (appointment: Appointment) => {
          const { patientId, practitionerId } = appointment;

          return {
            ...appointment,
            patient: patients.find((patient) => patient.id === patientId),
            practitioner: practitioners.find(
              (practitioner) => practitioner.id === practitionerId,
            ),
          };
        },
      );

      setAppointmentsDetailed(updatedAppointments);
    }
  }, [isLoading, appointments, practitioners, patients]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="appointment page">
      <h1>Appointments</h1>
      <Section
        name="instructions"
        title="Instructions"
        className="instructions"
      >
        <p>
          To book an appointment, we have to set the following required
          informations: the practitioner, the patient and date.
        </p>
        <p>
          The backend implementation is already done, you have all necessary
          routes to work and implement requested features.
        </p>
        <p>
          In first you have to create the appointment form. You are free to use
          the validation form that you want like Formik or React-hook-form.
        </p>
        <p>
          In the second time, you will show the list of all created appointments
          on the right side
        </p>
        <p>
          We don't have mock ups, you have to design your own solution and
          propose a simple workflow for users. It also should be responsive.
        </p>
        <p>
          We expect you to implement two bonus features: you can choose among
          the suggested features in the bonus section or choose to implement one
          of your choice.
        </p>
      </Section>
      <AllTasks className="goals" />
      <div className="structurePage">
        <Section
          name="appointment-form"
          title="Appointment Form"
          className="appointment__form"
        >
          <AppointmentForm
            practitioners={practitioners}
            patients={patients}
            availabilities={availabilities}
          />
        </Section>
        <Section
          name="appointment-list"
          title="Appointment List"
          className="appointment__list"
        >
          <AppointmentList items={appointmentsDetailed} />
        </Section>
      </div>
    </div>
  );
};

AppointmentsPage.pageTitle = 'Appointments';
AppointmentsPage.pageSubtitle = "Let's get to work 👩‍💻";

export default AppointmentsPage;
