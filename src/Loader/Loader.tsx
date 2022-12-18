import { FC } from 'react';
import style from './Loader.module.scss';

const Loader: FC = () => {
  return (
    <div className={style.Loader}>
      <div className={style.Loader__spinner}></div>
    </div>
  );
};

export default Loader;
