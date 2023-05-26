import { GalleryItem, Image } from "./ImageGalleryItem.styled";

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, handleOpenModal }) => {
  return (
    <GalleryItem className="js-gallery-item" onClick={handleOpenModal} data-largeimage={largeImageURL} data-tags={tags}>
      <Image src={webformatURL} alt={tags} loading="lazy"/>
    </GalleryItem>
  );
};

export { ImageGalleryItem };
