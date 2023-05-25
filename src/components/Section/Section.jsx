import PropTypes from 'prop-types';
import { SectionStyles } from './Section.styled';

const Section = ({ children }) => {
  return <SectionStyles>{children}</SectionStyles>;
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
};

export {Section};