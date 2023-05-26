import React, { Component } from 'react';
import { fetchImages } from 'api/fetchImages';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Error } from 'components/Error/Error';
import { Greeting, ImageGalleryBox } from './ImageGallery.styled';
import { Section } from 'components/Section/Section';
import { Button } from 'components/Button/Button';

class ImageGallery extends Component {
  state = { images: [], error: null, status: 'idle', page: 1, perPage: 12, responseLength: 0 };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    const perPage = this.state.perPage;

    if (prevQuery !== nextQuery) {
      this.setState({ status: 'pending', images: [], page: 1 });
      fetchImages(nextQuery, 1, perPage)
        .then(images => this.setState({ images, status: 'resolved', responseLength: images.length }))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    if (prevPage < nextPage) {
      this.setState({ status: 'pending' });
      fetchImages(nextQuery, nextPage, perPage)
        .then(nextImages =>
          this.setState(({ images: prevImages }) => ({
            images: [...prevImages, ...nextImages],
            status: 'resolved',
            responseLength: nextImages.length,
          }))
        )
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
    const { images, error, status, perPage, responseLength } = this.state;

    if (status === 'idle') {
      return (
        <Section>
          <Greeting>Hello! Please enter the topic you would like to search images for</Greeting>
        </Section>
      );
    }

    if (status === 'pending') {
      return (
        <Section>
          <ImageGalleryBox>{images && images.map(this.mapImages)}</ImageGalleryBox>
          <Loader />
          {responseLength === perPage && <Button countPage={this.countPage} />}
        </Section>
      );
    }

    if (status === 'rejected') {
      return (
        <Section>
          <ImageGalleryBox>{images && images.map(this.mapImages)}</ImageGalleryBox>
          <Error message={error.message} />
          {responseLength === perPage && <Button countPage={this.countPage} />}
        </Section>
      );
    }

    if (status === 'resolved') {
      return (
        <Section>
          <ImageGalleryBox>{images && images.map(this.mapImages)}</ImageGalleryBox>
          {responseLength === perPage && <Button countPage={this.countPage} />}
        </Section>
      );
    }
  }
}

export { ImageGallery };
