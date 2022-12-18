import { Availability, Patient, Practitioner } from '@prisma/client';
import EditorLink from '../EditorLink';
import style from './AppointmentForm.module.scss';

type Props = {
  availabilities: Availability[];
  patients: Patient[];
  practitioners: Practitioner[];
};

const AppointmentForm: React.FC<Props> = ({
  availabilities,
  patients,
  practitioners,
}) => {
  console.log(availabilities, patients, practitioners);
  return (
    <div className={style.AppointmentForm}>
      Edit{' '}
      <EditorLink path="src/components/AppointmentForm.tsx">
        "src/components/AppointmentForm.tsx"
      </EditorLink>{' '}
      to implement Appointment form feature.
    </div>
  );
};

export default AppointmentForm;
