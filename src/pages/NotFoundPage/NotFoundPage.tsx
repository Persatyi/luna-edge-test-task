import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Container from '../../components/Container/Container';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    if (seconds === 0) {
      clearInterval(timer);
      navigate('/');
    }

    return () => clearInterval(timer);
  }, [navigate, seconds]);

  return (
    <Container>
      <p>Page is not found!</p>
      <p>You will be redirected to the main page in: {seconds}</p>

      <p>Or you can click on the link below</p>
      <Link to="/">Back to main</Link>
    </Container>
  );
};

export default NotFoundPage;
