import { Appointment, Patient, Practitioner } from '@prisma/client';
import { AppointmentDetailed } from 'types/appointment';
import { formatDateRange } from 'utils/date';
import style from './AppointmentList.module.scss';

type Props = {
  items: AppointmentDetailed[];
};

const AppointmentList: React.FC<Props> = ({ items }) => {
  console.log(items);
  return (
    <div className={style.AppointmentList}>
      {items.map((item) => {
        const { startDate, endDate, id, patient, practitioner } = item;

        return (
          <div className={style.AppointmentList__item} key={`${id}`}>
            <div>
              {patient?.lastName?.toUpperCase()} {patient?.firstName}
            </div>
            <div>
              {practitioner?.lastName?.toUpperCase()} {practitioner?.firstName}{' '}
              - {practitioner?.speciality}
            </div>
            <div>{formatDateRange({ from: startDate, to: endDate })}</div>
          </div>
        );
      })}
    </div>
  );
};

export default AppointmentList;
