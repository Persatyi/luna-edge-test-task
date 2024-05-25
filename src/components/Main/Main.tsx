import React from 'react';
import { Outlet } from 'react-router-dom';

import Container from '../Container';

const Main = () => {
  return (
    <main className="pt-4 pb-4">
      <Container>
        <Outlet />
      </Container>
    </main>
  );
};

export default Main;
