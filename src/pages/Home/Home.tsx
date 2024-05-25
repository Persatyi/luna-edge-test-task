import React, { useState, useEffect } from "react";

import { IQuiz } from "../../components/QuizForm/QuizForm";
import Button from "../../components/Button";

import API from "../../servises/APIServise";

const Home: React.FC = () => {
  const [quizList, setQuizList] = useState<IQuiz[]>([]);

  useState(() => {
    const getAllQuizzes = async () => {
      try {
        const response = await API.getAllQuizzes();
        setQuizList(response);
      } catch (error) {
        console.log(error);
      }
    };

    getAllQuizzes();
  });

  const removeQuizHandler = async (id: number) => {
    try {
      const response = await API.removeQuiz(id);
      setQuizList(response);
    } catch (error) {
      console.log(error);
    }
  };

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
          <Button type="link" text="Open" to={`take-quiz/${id}`} />
          <Button text="Delete quiz" onClick={() => removeQuizHandler(id)} />
        </li>
      ))}
    </ul>
  );
};

export default Home;
