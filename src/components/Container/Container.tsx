import React from 'react';

interface IPropsType {
  children?: JSX.Element | JSX.Element[];
}

const Container: React.FC<IPropsType> = ({ children }) => {
  return <div className="ml-auto mr-auto mt-0 mb-0 pl-3 pr-3 md:w-full">{children}</div>;
};

export default Container;
