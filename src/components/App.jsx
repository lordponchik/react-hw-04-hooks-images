import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { requestImages } from 'services/api';
import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMore from './LoadMore/LoadMore';
import Loader from './Loader/Loader';

import s from './App.module.css';

const DATA_IMAGES = {
  images: [],
  query: '',
  currentPage: 1,
  perPage: 12,
  total: 0,
};

export class App extends Component {
  state = {
    ...DATA_IMAGES,
    isLoading: false,
    showLoadMore: false,
    showModal: false,
    modalData: null,
  };

  componentDidUpdate(_, prevState) {
    const { query, currentPage } = this.state;

    if (
      (query !== prevState.query && query !== '') ||
      (currentPage !== prevState.currentPage && query !== '')
    ) {
      this.sendingRequest();
    }
  }

  sendingRequest = async () => {
    const { query, currentPage, total, perPage } = this.state;

    this.setState({
      isLoading: true,
      showLoadMore: false,
    });

    const restImages = total - perPage * currentPage;

    if (total !== 0 && restImages < perPage) {
      this.setState({ perPage: restImages });
    }

    try {
      const { hits, totalHits } = await requestImages(
        query,
        currentPage,
        perPage
      );

      if (hits.length === 0) {
        toast.warn('Nothing found');
      }

      this.setState(prevState => {
        return {
          images: [...prevState.images, ...hits],
          total: totalHits,
          showLoadMore:
            currentPage < Math.ceil(totalHits / DATA_IMAGES.perPage),
        };
      });
    } catch (error) {
      toast.warn(error.message);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  receivingRequest = q => {
    if (q === null) {
      this.setState({
        ...DATA_IMAGES,
        showLoadMore: false,
      });
      return;
    }

    if (this.state.query === q) {
      toast.warn(`"${q}" found`);
      return;
    }

    this.setState({
      ...DATA_IMAGES,
      query: q,
    });
  };

  nextPage = () => {
    this.setState(prevState => {
      return { currentPage: prevState.currentPage + 1 };
    });
  };

  toggleModal = data => {
    this.setState(prevState => {
      return {
        showModal: !prevState.showModal,
        modalData: prevState.modalData === null ? { ...data } : null,
      };
    });
    document.body.classList.toggle('no-scroll');
  };

  render() {
    const {
      images,
      showLoadMore,
      isLoading,
      showModal,
      modalData,
      currentPage,
    } = this.state;

    return (
      <div className={s.app}>
        <ToastContainer></ToastContainer>
        <Searchbar receivingRequest={this.receivingRequest}></Searchbar>
        {images.length > 0 && (
          <ImageGallery
            images={images}
            currentPage={currentPage}
            openModal={this.toggleModal}
          ></ImageGallery>
        )}
        {isLoading && <Loader></Loader>}
        {showLoadMore && <LoadMore nextPage={this.nextPage}></LoadMore>}
        {showModal && (
          <Modal data={modalData} closeModal={this.toggleModal}></Modal>
        )}
      </div>
    );
  }
}
