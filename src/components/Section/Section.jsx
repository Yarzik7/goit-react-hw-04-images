import PropTypes from 'prop-types';
import { SectionStyles } from './Section.styled';
import { Container } from './Container/Container';

const Section = ({ children }) => {
  return (
    <SectionStyles>
      <Container>{children}</Container>
    </SectionStyles>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
};

export {Section};