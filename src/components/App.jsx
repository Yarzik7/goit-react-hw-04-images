import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
  };

  const handleLoadMore = () => setPage(prevPage => prevPage + 1);

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />

      <ImageGallery query={query} handleOpenModal={''} page={page} handleLoadMore={handleLoadMore} />

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export { App };
