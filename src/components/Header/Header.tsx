import React from 'react';
import Container from '../Container';

const Header = () => {
  return (
    <header className="pt-5 pb-5 bg-blue">
      <Container>
        <h1 className="text-2xl text-white text-center font-bold">Welcome to Quiz</h1>
      </Container>
    </header>
  );
};

export default Header;
