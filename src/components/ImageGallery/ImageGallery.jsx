import React, { Component } from 'react';
import { fetchImages } from 'api/fetchImages';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Error } from 'components/Error/Error';
import { Greeting, ImageGalleryBox } from './ImageGallery.styled';
import { Section } from 'components/Section/Section';
import { Container } from 'components/Section/Container/Container';
import { Button } from 'components/Button/Button';

class ImageGallery extends Component {
  state = { images: [], error: null, status: 'idle', page: 1 };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery) {
      this.setState({ status: 'pending', images: [], page: 1 });
      fetchImages(nextQuery, 1, 12)
        .then(images => this.setState({ images, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

      if (prevPage < nextPage) {
        this.setState({ status: 'pending'});
      fetchImages(nextQuery, nextPage, 12)
        .then(nextImages => this.setState(({ images: prevImages }) => ({images: [...prevImages, ...nextImages], status: 'resolved',})))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  countPage = () => {
    this.setState(({ page }) => ({ page: ++page }));
  };

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
            <ImageGalleryBox>{images && images.map(this.mapImages)}</ImageGalleryBox>
            <Loader />
            {images.length && <Button countPage={this.countPage} />}
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
            {images.length && <Button countPage={this.countPage} />}
          </Container>
        </Section>
      );
    }
  }
}

export { ImageGallery };
