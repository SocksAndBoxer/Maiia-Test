import EditorLink from '../EditorLink';
import style from './AppointmentForm.module.scss';

const AppointmentForm = () => {
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
