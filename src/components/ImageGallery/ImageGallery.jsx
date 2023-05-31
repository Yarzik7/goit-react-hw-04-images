import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchImages } from 'api/fetchImages';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Error } from 'components/Error/Error';
import { Greeting, ImageGalleryBox } from './ImageGallery.styled';
import { Section } from 'components/Section/Section';
import { Button } from 'components/Button/Button';

const finiteStates = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const PERPAGE = 12;

const ImageGallery = ({ query, page, handleLoadMore }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(finiteStates.IDLE);
  const [responseLength, setResponseLength] = useState(0);

  useEffect(() => {
    if (!query) return;

    const responsResolved = newImages => {
      setImages(prevImages => [...prevImages, ...newImages]);
      setStatus(finiteStates.RESOLVED);
      setResponseLength(newImages.length);
    };

    const responseRejected = error => {
      setError(error);
      setStatus(finiteStates.REJECTED);
    };

    if (page === 1) {
      setImages([]);
    }

    setStatus(finiteStates.PENDING);

    fetchImages(query, page, PERPAGE).then(responsResolved).catch(responseRejected);
  }, [query, page]);

  const mapImages = ({ id, webformatURL, largeImageURL, tags }) => (
    <ImageGalleryItem
      key={id}
      webformatURL={webformatURL}
      largeImageURL={largeImageURL}
      tags={tags}
    />
  );

  return (
    <Section>
      {status === finiteStates.IDLE && (
        <Greeting>Hello! Please enter the topic you would like to search images for</Greeting>
      )}

      {status !== finiteStates.IDLE && !!images.length && <ImageGalleryBox>{images.map(mapImages)}</ImageGalleryBox>}

      {status === finiteStates.PENDING && <Loader />}

      {status === finiteStates.REJECTED && <Error message={error.message} />}

      {responseLength === PERPAGE && !!images.length && <Button handleLoadMore={handleLoadMore} />}
    </Section>
  );
};

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  handleLoadMore: PropTypes.func.isRequired
}

export { ImageGallery };
