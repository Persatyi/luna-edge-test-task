import React from "react";
import { Outlet } from "react-router-dom";

import Container from "../Container";

const Main = () => {
  return (
    <main>
      <Container>
        <Outlet />
      </Container>
    </main>
  );
};

export default Main;
