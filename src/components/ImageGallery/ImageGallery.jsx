import { useState, useEffect } from 'react';
import { fetchImages } from 'api/fetchImages';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Error } from 'components/Error/Error';
import { Greeting, ImageGalleryBox } from './ImageGallery.styled';
import { Section } from 'components/Section/Section';
import { Button } from 'components/Button/Button';

const ImageGallery = ({ query, handleOpenModal, page, countPage }) => {
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

      {responseLength === perPage && !!images.length && <Button countPage={countPage} />}
    </Section>
  );
};

// class ImageGallery extends Component {
//   state = { images: [], error: null, status: 'idle', page: 1, perPage: 12, responseLength: 0 };

//   componentDidUpdate(prevProps, prevState) {
//     const prevQuery = prevProps.query;
//     const nextQuery = this.props.query;

//     const prevPage = prevState.page;
//     const nextPage = this.state.page;

//     const perPage = this.state.perPage;

//     if (prevQuery !== nextQuery) {
//       this.setState({ status: 'pending', images: [], page: 1 });
//       fetchImages(nextQuery, 1, perPage)
//         .then(images => this.setState({ images, status: 'resolved', responseLength: images.length }))
//         .catch(error => this.setState({ error, status: 'rejected' }));
//     }

//     if (prevPage < nextPage) {
//       this.setState({ status: 'pending' });
//       fetchImages(nextQuery, nextPage, perPage)
//         .then(nextImages =>
//           this.setState(({ images: prevImages }) => ({
//             images: [...prevImages, ...nextImages],
//             status: 'resolved',
//             responseLength: nextImages.length,
//           }))
//         )
//         .catch(error => this.setState({ error, status: 'rejected' }));
//     }
//   }

//   countPage = () => {
//     this.setState(({ page }) => ({ page: page + 1 }));
//   };

//   mapImages = ({ id, webformatURL, largeImageURL, tags }) => (
//     <ImageGalleryItem
//       key={id}
//       webformatURL={webformatURL}
//       largeImageURL={largeImageURL}
//       tags={tags}
//       handleOpenModal={this.props.handleOpenModal}
//     />
//   );

//   render() {
//     const { images, error, status, perPage, responseLength } = this.state;

//     return (
//       <Section>
//         {status === 'idle' && <Greeting>Hello! Please enter the topic you would like to search images for</Greeting>}

//         {(status !== 'idle' && !!images.length) && (
//           <ImageGalleryBox>{images.map(this.mapImages)}</ImageGalleryBox>
//         )}

//         {status === 'pending' && <Loader />}

//         {status === 'rejected' && <Error message={error.message} />}

//         {responseLength === perPage && !!images.length && <Button countPage={this.countPage} />}
//       </Section>
//     );
//   }
// }

export { ImageGallery };
