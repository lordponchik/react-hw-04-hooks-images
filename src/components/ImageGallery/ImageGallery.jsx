import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';
import React, { Component } from 'react';
import { animateScroll as scroll } from 'react-scroll';

export class ImageGallery extends Component {
  refsImages = React.createRef();

  getSnapshotBeforeUpdate(prevProps, _) {
    if (prevProps.images.length < this.props.images.length) {
      const list = this.refsImages.current;

      return list.scrollHeight;
    }
    return null;
  }

  componentDidUpdate(_, __, snapshot) {
    if (snapshot !== null) {
      scroll.scrollTo(snapshot);
    }
  }

  render() {
    const { images, openModal } = this.props;

    return (
      <ul className={s.imageGallery} ref={this.refsImages}>
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
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  openModal: PropTypes.func.isRequired,
};
