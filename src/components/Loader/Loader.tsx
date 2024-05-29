import React from 'react';
import spriteSvg from '../../assets/images/sprite/sprite.svg';

interface ILoaderProps {
  name: string;
  styles?: string;
}

const Loader: React.FC<ILoaderProps> = ({ name, styles }) => {
  return (
    <svg className={`animate-spin ${styles}`} viewBox="0 0 24 24">
      <use href={`${spriteSvg}#${name}`}></use>
    </svg>
  );
};

export default Loader;
