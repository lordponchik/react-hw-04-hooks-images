import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ data: { largeImageURL, tags }, closeModal }) {
  useEffect(() => {
    window.addEventListener('keydown', closeModal);

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  }, [closeModal]);

  const modalClose = e => {
    if (e.code === 'Escape' || e.target === e.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <div className={s.overlay} onClick={modalClose}>
      <div className={s.modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  data: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  closeModal: PropTypes.func.isRequired,
};
