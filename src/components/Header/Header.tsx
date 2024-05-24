import React from "react";
import { Link } from "react-router-dom";

import Container from "../Container";

const Header = () => {
  return (
    <header className="pt-5 pb-5">
      <Container>
        <h1>Welcome to Quiz</h1>
        <Link to="/create">Create new quiz</Link>
      </Container>
    </header>
  );
};

export default Header;
