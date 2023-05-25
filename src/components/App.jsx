import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import { Modal } from './Modal/Modal';
// import { ModalImage } from './Modal/Modal.styled';

class App extends Component {
  state = {
    query: '',
    showModal: false,
    largeimage: null,
    tags: null,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleOpenModal = ({ currentTarget }) => {
    if (!currentTarget.classList.contains('js-gallery-item')) {
      return;
    }
  
    const { largeimage, tags } = currentTarget.dataset;

    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeimage,
      tags,
    }));
  };

  handleFormSubmit = query => {
    this.setState({ query });
  };

  render() {
    const { showModal, largeimage, tags } = this.state;
    return (
      <>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={`${largeimage}`} alt={`${tags}`} />
          </Modal>
        )}
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          query={this.state.query}
          handleOpenModal={this.handleOpenModal}
        />
        <ToastContainer position="top-right" autoClose={3000} />
      </>
    );
  }
}

export { App };
