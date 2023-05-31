import { useState } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import { animateScroll as scroll } from 'react-scroll';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
  };

  const animatedScroll = () => {
      scroll.scrollMore(window.innerHeight * 0.8);
    };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    animatedScroll();
  }

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />

      <ImageGallery query={query} page={page} handleLoadMore={handleLoadMore} />

      <ToastContainer position="top-right" autoClose={5000} theme="colored" closeOnClick hideProgressBar pauseOnHover />
    </>
  );
};

export { App };
