import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';
import { useLayoutEffect, useRef } from 'react';
import { animateScroll as scroll } from 'react-scroll';

export default function ImageGallery({ images, currentPage, openModal }) {
  const firstSnapshot = useRef(0);
  const refsImages = useRef();

  useLayoutEffect(() => {
    if (currentPage === 1) {
      firstSnapshot.current = refsImages.current.scrollHeight;
      return;
    }

    const snapshot = refsImages.current.scrollHeight - firstSnapshot.current;
    scroll.scrollTo(snapshot);
  }, [images, currentPage]);

  return (
    <ul className={s.imageGallery} ref={refsImages}>
      {images.map((image, id) => {
        return (
          <ImageGalleryItem
            key={`${image.id}_${id}`}
            image={image}
            openModal={openModal}
          ></ImageGalleryItem>
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  openModal: PropTypes.func.isRequired,
};
