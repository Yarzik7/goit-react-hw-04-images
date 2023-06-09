import { Oval } from 'react-loader-spinner';

const Loader = () => {
  return (
      <Oval
        height={'7vw'}
        width={'7vw'}
        color="#3f51b5"
        wrapperStyle={{}}
        wrapperClass="loader"
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#3f51b5"
        strokeWidth={4}
        strokeWidthSecondary={4}
      />
  );
};

export { Loader };
