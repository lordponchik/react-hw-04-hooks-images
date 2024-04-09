import PropTypes from 'prop-types';

import s from './LoadMore.module.css';

function LoadMore({ nextPage }) {
  return (
    <button type="button" onClick={nextPage} className={s.loadMore}>
      Load more
    </button>
  );
}

export default LoadMore;

LoadMore.propTypes = {
  nextPage: PropTypes.func.isRequired,
};
