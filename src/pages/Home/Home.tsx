import React, { useState, useEffect } from 'react';

import { IQuiz } from '../../components/QuizForm/QuizForm';
import Button from '../../components/Button';

import API from '../../servises/APIServise';

const Home: React.FC = () => {
  const [quizList, setQuizList] = useState<IQuiz[]>([]);

  useEffect(() => {
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
    return <p>Loading...</p>;
  }

  return (
    <>
      <Button
        type="link"
        to="/create"
        text="Create new quiz"
        className="block w-52 mt-3 mb-3 text-center font-semibold text-white border-white border-2 p-2 rounded bg-purple"
      />

      <ul>
        {quizList.map(({ name, id, questions }) => (
          <li key={id} className="flex mb-1 w-full border-2 border-gray p-2 rounded bg-gray-light">
            <div className="flex-row">
              <div className="flex">
                <p className="text-5 font-semibold">
                  Quiz name: <span className="text-5 font-normal">{name}</span>
                </p>
              </div>
              <div className="flex">
                <p className="text-5 font-semibold">
                  Amount of questions:
                  <span className="text-5 font-normal"> {questions.length}</span>
                </p>
              </div>
            </div>
            <div className="flex ml-auto gap-1">
              <Button
                type="link"
                text="Pass quiz"
                to={`take-quiz/${id}`}
                className="block rounded bg-purple p-2 text-white font-semibold h-6"
              />
              <Button
                type="link"
                text="Edit quiz"
                to={`edit/${id}`}
                className="block rounded bg-orange p-2 text-white font-semibold h-6"
              />
              <Button
                text="Delete quiz"
                onClick={() => removeQuizHandler(id)}
                className="block rounded bg-red p-2 text-white font-semibold h-6"
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
