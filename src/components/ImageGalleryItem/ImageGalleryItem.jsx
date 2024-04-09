import PropTypes from 'prop-types';

import s from './ImageGalleryItem.module.css';

function ImageGalleryItem({
  image: { webformatURL, tags, largeImageURL },
  openModal,
}) {
  return (
    <li
      className={s.imageGalleryItem}
      onClick={() => {
        openModal({ largeImageURL, tags });
      }}
    >
      <img
        src={webformatURL}
        alt={tags}
        className={s.imageGalleryItem__image}
      />
    </li>
  );
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  images: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
  openModal: PropTypes.func.isRequired,
};
