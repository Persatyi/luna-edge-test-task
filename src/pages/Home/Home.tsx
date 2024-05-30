import React, { useState, useEffect, useContext } from 'react';

import { SearchContext } from '../../components/SearchContext/SearchContext';
import { IQuiz } from '../../components/QuizForm/QuizForm';
import Button from '../../components/Button';
import Loader from '../../components/Loader';

import API from '../../servises/APIServise';

const Home: React.FC = () => {
  const [quizList, setQuizList] = useState<IQuiz[]>([]);
  const [loader, setLoader] = useState<boolean>(API.isLoading);

  const searchContext = useContext(SearchContext);

  if (!searchContext) {
    throw new Error('HomePage must be used within a SearchProvider');
  }

  const { searchTerm } = searchContext;

  useEffect(() => {
    // setLoader(true);
    const getAllQuizzes = async () => {
      try {
        const response = await API.getAllQuizzes();
        // setLoader(false);
        setQuizList(response);
      } catch (error) {
        // setLoader(false);
        console.log(error);
      }
    };

    getAllQuizzes();
  }, []);

  useEffect(() => {
    const findQuiz = async () => {
      try {
        const response = await API.findQuiz(searchTerm);
        setLoader(false);
        setQuizList(response);
      } catch (error) {
        setLoader(false);
        setQuizList([]);
      }
    };

    findQuiz();
  }, [searchTerm]);

  const removeQuizHandler = async (id: number) => {
    try {
      const response = await API.removeQuiz(id);
      setQuizList(response);
    } catch (error) {
      console.log(error);
    }
  };

  if (loader) {
    return <p>Loading...</p>;
  }

  return (
    <>
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
                imagePosition="beforeText"
                text="Delete quiz"
                onClick={() => removeQuizHandler(id)}
                className="flex items-center rounded bg-red p-2 text-white font-semibold h-6"
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
