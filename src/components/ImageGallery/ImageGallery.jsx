import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchImages } from 'api/fetchImages';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Error } from 'components/Error/Error';
import { Greeting, ImageGalleryBox } from './ImageGallery.styled';
import { Section } from 'components/Section/Section';
import { Button } from 'components/Button/Button';

const ImageGallery = ({ query, handleOpenModal, page, handleLoadMore }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [responseLength, setResponseLength] = useState(0);

  const perPage = 12;

  useEffect(() => {
    if (!query) return;

    const responsResolved = newImages => {
      setImages(prevImages => [...prevImages, ...newImages]);
      setStatus('resolved');
      setResponseLength(newImages.length);
    };

    const responseRejected = error => {
      setError(error);
      setStatus('rejected');
    };

    if (page === 1) {
      setImages([]);
    }

    setStatus('pending');

    fetchImages(query, page, perPage).then(responsResolved).catch(responseRejected);
  }, [query, page]);

  const mapImages = ({ id, webformatURL, largeImageURL, tags }) => (
    <ImageGalleryItem
      key={id}
      webformatURL={webformatURL}
      largeImageURL={largeImageURL}
      tags={tags}
      handleOpenModal={handleOpenModal}
    />
  );

  return (
    <Section>
      {status === 'idle' && <Greeting>Hello! Please enter the topic you would like to search images for</Greeting>}

      {status !== 'idle' && !!images.length && <ImageGalleryBox>{images.map(mapImages)}</ImageGalleryBox>}

      {status === 'pending' && <Loader />}

      {status === 'rejected' && <Error message={error.message} />}

      {responseLength === perPage && !!images.length && <Button handleLoadMore={handleLoadMore} />}
    </Section>
  );
};

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  handleLoadMore: PropTypes.func.isRequired
}

export { ImageGallery };
