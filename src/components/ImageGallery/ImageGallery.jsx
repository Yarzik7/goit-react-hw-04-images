import React, { Component } from 'react';
import { fetchImages } from 'api/fetchImages';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Error } from 'components/Error/Error';
import { Greeting, ImageGalleryBox } from './ImageGallery.styled';
import { Section } from 'components/Section/Section';
import { Container } from 'components/Section/Container/Container';

class ImageGallery extends Component {
  state = { images: null, error: null, status: 'idle' };

  componentDidUpdate(prevProps, prevStat) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;

    if (prevQuery !== nextQuery) {
      this.setState({ status: 'pending' });

      fetchImages(nextQuery, 1, 12)
        .then(images => this.setState({ images, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  mapImages = ({ id, webformatURL, largeImageURL, tags }) => (
    <ImageGalleryItem
      key={id}
      webformatURL={webformatURL}
      largeImageURL={largeImageURL}
      tags={tags}
      handleOpenModal={this.props.handleOpenModal}
    />
  );

  render() {
    const { images, error, status } = this.state;

    if (status === 'idle') {
      return (
        <Section>
          <Container>
            <Greeting>
              Hello! Please enter the topic you would like to search images for
            </Greeting>
          </Container>
        </Section>
      );
    }

    if (status === 'pending') {
      return (
        <Section>
          <Container>
            <Loader />
          </Container>
        </Section>
      );
    }

    if (status === 'rejected') {
      return (
        <Section>
          <Container>
            <Error message={error.message} />
          </Container>
        </Section>
      );
    }

    if (status === 'resolved') {
      return (
        <Section>
          <Container>
            <ImageGalleryBox>
              {images && images.map(this.mapImages)}
            </ImageGalleryBox>
          </Container>
        </Section>
      );
    }
  }
}

export { ImageGallery };
