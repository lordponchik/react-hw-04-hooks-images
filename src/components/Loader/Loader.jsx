import { ProgressBar } from 'react-loader-spinner';

import s from './Loader.module.css';

function Loader() {
  return (
    <div className={s.loader}>
      <ProgressBar
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default Loader;
