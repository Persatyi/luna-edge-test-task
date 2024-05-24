import React, { useState, useEffect } from "react";

import { IQuiz } from "../../components/QuizForm/QuizForm";

import API from "../../servises/APIServise";

const Home: React.FC = () => {
  const [quizList, setQuizList] = useState<IQuiz[]>([]);

  const getAllQuizzes = () => {
    API.getAllQuizzes().then((response) => {
      setQuizList(response);
    });
  };

  useState(() => {
    getAllQuizzes();
  });

  if (quizList.length === 0) {
    return <p>Here is no quizzes yet.</p>;
  }

  return (
    <ul>
      {quizList.map(({ name, id, questions }) => (
        <li key={id}>
          <p>Quiz name: </p>
          <p>{name}</p>
          <p>Amount of questions</p>
          <p>{questions.length}</p>
        </li>
      ))}
    </ul>
  );
};

export default Home;
