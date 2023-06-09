import styled from '@emotion/styled';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

const ModalImageBox = styled.div`
  width: 65%;
  height: auto;
`;

const ModalImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
`;

export { Overlay, ModalImageBox, ModalImage };
