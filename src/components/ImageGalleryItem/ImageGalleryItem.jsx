import { useState } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, Image } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
import { ModalImage } from 'components/Modal/Modal.styled';

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(showModal => !showModal);

  return (
    <GalleryItem>
      <Image src={webformatURL} alt={tags} loading="lazy" onClick={toggleModal} />
      {showModal && (
        <Modal onClose={toggleModal}>
          <ModalImage src={`${largeImageURL}`} alt={`${tags}`} />
        </Modal>
      )}
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export { ImageGalleryItem };
