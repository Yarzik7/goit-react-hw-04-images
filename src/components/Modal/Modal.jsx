import { useEffect} from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalImageBox } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, children }) => {
  useEffect(() => {

    const handleCloseByEsc = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleCloseByEsc);

    return () => {
      window.removeEventListener('keydown', handleCloseByEsc);
    };
  }, [onClose]);

   const handleBackdropClick = event => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalImageBox>{children}</ModalImageBox>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export { Modal };
