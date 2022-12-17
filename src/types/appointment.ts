import { Appointment, Patient, Practitioner } from '@prisma/client';

export interface AppointmentDetailed extends Appointment {
  patient?: Patient;
  practitioner?: Practitioner;
}
