import styled from '@emotion/styled';

const Greeting = styled.p`
  text-align: center;
  font-weight: 700;
  font-size: 20px;
`;

const ImageGalleryBox = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

export { Greeting, ImageGalleryBox };
