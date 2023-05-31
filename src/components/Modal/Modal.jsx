import { useEffect } from 'react';
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
// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleCloseByEsc);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleCloseByEsc);
//   }

//   handleCloseByEsc = event => {
//     if (event.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = event => {
//     if (event.target === event.currentTarget) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <Overlay onClick={this.handleBackdropClick}>
//         <ModalImageBox>{this.props.children}</ModalImageBox>
//       </Overlay>,
//       modalRoot
//     );
//   }
// }

export { Modal };
