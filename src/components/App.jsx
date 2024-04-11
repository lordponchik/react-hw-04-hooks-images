import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { requestImages } from 'services/api';
import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMore from './LoadMore/LoadMore';
import Loader from './Loader/Loader';

import s from './App.module.css';

const PER_PAGE = 12;

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    const sendingRequest = async () => {
      if (query !== '') {
        setIsLoading(true);
        setShowLoadMore(true);

        const restImages = total - perPage * currentPage;

        if (total !== 0 && restImages < perPage) {
          setPerPage(restImages);
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

          setImages(prevImages => [...prevImages, ...hits]);
          setTotal(totalHits);
          setShowLoadMore(currentPage < Math.ceil(totalHits / PER_PAGE));
        } catch (error) {
          toast.warn(error.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    sendingRequest();
  }, [query, currentPage]);

  const receivingRequest = q => {
    if (q === null) {
      setImages([]);
      setQuery('');
      setCurrentPage(1);
      setPerPage(PER_PAGE);
      setTotal(0);
      setShowLoadMore(false);
      return;
    }

    if (query === q) {
      toast.warn(`"${q}" found`);
      return;
    }

    setImages([]);
    setQuery(q);
    setCurrentPage(1);
    setPerPage(PER_PAGE);
    setTotal(0);
  };

  const nextPage = () => {
    setCurrentPage(perCurrentPage => perCurrentPage + 1);
  };

  const toggleModal = data => {
    setShowModal(prevShowModal => !prevShowModal);
    setModalData(prevModalData =>
      prevModalData === null ? { ...data } : null
    );

    document.body.classList.toggle('no-scroll');
  };

  return (
    <div className={s.app}>
      <ToastContainer></ToastContainer>
      <Searchbar receivingRequest={receivingRequest}></Searchbar>
      {images.length > 0 && (
        <ImageGallery
          images={images}
          currentPage={currentPage}
          openModal={toggleModal}
        ></ImageGallery>
      )}
      {isLoading && <Loader></Loader>}
      {showLoadMore && <LoadMore nextPage={nextPage}></LoadMore>}
      {showModal && <Modal data={modalData} closeModal={toggleModal}></Modal>}
    </div>
  );
}

// export class App extends Component {
// state = {
//   ...DATA_IMAGES,
//   isLoading: false,
//   showLoadMore: false,
//   showModal: false,
//   modalData: null,
// };

// componentDidUpdate(_, prevState) {
//   const { query, currentPage } = this.state;

//   if (
//     (query !== prevState.query && query !== '') ||
//     (currentPage !== prevState.currentPage && query !== '')
//   ) {
//     this.sendingRequest();
//   }
// }

// sendingRequest = async () => {
//   const { query, currentPage, total, perPage } = this.state;

//   this.setState({
//     isLoading: true,
//     showLoadMore: false,
//   });

//   const restImages = total - perPage * currentPage;

//   if (total !== 0 && restImages < perPage) {
//     this.setState({ perPage: restImages });
//   }

//   try {
//     const { hits, totalHits } = await requestImages(
//       query,
//       currentPage,
//       perPage
//     );

//     if (hits.length === 0) {
//       toast.warn('Nothing found');
//     }

//     this.setState(prevState => {
//       return {
//         images: [...prevState.images, ...hits],
//         total: totalHits,
//         showLoadMore:
//           currentPage < Math.ceil(totalHits / DATA_IMAGES.perPage),
//       };
//     });
//   } catch (error) {
//     toast.warn(error.message);
//   } finally {
//     this.setState({
//       isLoading: false,
//     });
//   }
// };

// receivingRequest = q => {
//   if (q === null) {
//     this.setState({
//       ...DATA_IMAGES,
//       showLoadMore: false,
//     });
//     return;
//   }

//   if (this.state.query === q) {
//     toast.warn(`"${q}" found`);
//     return;
//   }

//   this.setState({
//     ...DATA_IMAGES,
//     query: q,
//   });
// };

//   nextPage = () => {
//     this.setState(prevState => {
//       return { currentPage: prevState.currentPage + 1 };
//     });
//   };

//   toggleModal = data => {
//     this.setState(prevState => {
//       return {
//         showModal: !prevState.showModal,
//         modalData: prevState.modalData === null ? { ...data } : null,
//       };
//     });
//     document.body.classList.toggle('no-scroll');
//   };

//   render() {
//     const {
//       images,
//       showLoadMore,
//       isLoading,
//       showModal,
//       modalData,
//       currentPage,
//     } = this.state;
//   }
// }
