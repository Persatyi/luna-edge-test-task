import React from "react";
import { Link } from "react-router-dom";

import QuizForm from "../../components/QuizForm";

const CreateQuiz: React.FC = () => {
  return (
    <>
      <QuizForm />
      <Link to="/">Back to home</Link>
    </>
  );
};

export default CreateQuiz;
