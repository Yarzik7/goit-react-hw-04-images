import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import { Modal } from './Modal/Modal';
import { ModalImage } from './Modal/Modal.styled';

const App = () => {
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeimage, setLargeImage] = useState(null);
  const [tags, setTags] = useState(null);
  // const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  const toggleModal = () => setShowModal(showModal => !showModal);

  const handleOpenModal = ({ currentTarget }) => {
    if (!currentTarget.classList.contains('js-gallery-item')) {
      return;
    }

    const { largeimage, tags } = currentTarget.dataset;

    setLargeImage(largeimage);
    setTags(tags);
    setShowModal(showModal => !showModal);
  };

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
  };

  const countPage = () => setPage(prevPage => prevPage + 1);
  
  return (
    <>
      {showModal && (
        <Modal onClose={toggleModal}>
          <ModalImage src={`${largeimage}`} alt={`${tags}`} />
        </Modal>
      )}

      <Searchbar onSubmit={handleFormSubmit} />

      <ImageGallery
        query={query}
        handleOpenModal={handleOpenModal}
        page={page}
        countPage={countPage}
      />

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

// class App extends Component {
//   state = {
//     query: '',
//     showModal: false,
//     largeimage: null,
//     tags: null,
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({ showModal: !showModal }));
//   };

//   handleOpenModal = ({ currentTarget }) => {
//     if (!currentTarget.classList.contains('js-gallery-item')) {
//       return;
//     }

//     const { largeimage, tags } = currentTarget.dataset;

//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//       largeimage,
//       tags,
//     }));
//   };

//   handleFormSubmit = query => {
//     this.setState({ query });
//   };

//   render() {
//     const { showModal, largeimage, tags } = this.state;
//     return (
//       <>
//         {showModal && (
//           <Modal onClose={this.toggleModal}>
//             <ModalImage src={`${largeimage}`} alt={`${tags}`} />
//           </Modal>
//         )}

//         <Searchbar onSubmit={this.handleFormSubmit} />

//         <ImageGallery query={this.state.query} handleOpenModal={this.handleOpenModal} />

//         <ToastContainer position="top-right" autoClose={3000} />
//       </>
//     );
//   }
// }

export { App };
