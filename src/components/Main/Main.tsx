import React from 'react';
import { Outlet } from 'react-router-dom';

import Container from '../Container';

const Main = () => {
  return (
    <main className="relative flex flex-col min-h-screen pt-4 pb-4">
      <Container>
        <Outlet />
      </Container>
    </main>
  );
};

export default Main;
