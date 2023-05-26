import PropTypes from 'prop-types';
import { ContainerStyles } from './Container.styled';

const Container = ({ children }) => <ContainerStyles>{children}</ContainerStyles>;

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Container };
