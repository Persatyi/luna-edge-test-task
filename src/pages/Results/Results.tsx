import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import API from '../../servises/APIServise';

import { IQuiz } from '../../components/QuizForm/QuizForm';

import spriteSvg from '../../assets/images/sprite/sprite.svg';

const Results = () => {
  const { id } = useParams<{ id?: string }>();
  const location = useLocation();
  const [quiz, setQuiz] = useState<IQuiz | null>(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [incorrectAnswersCount, setIncorrectAnswersCount] = useState<number>(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (id !== undefined) {
        const parsedId = Number.parseInt(id, 10);
        if (!isNaN(parsedId)) {
          try {
            const response = await API.getQuizById(parsedId);
            if (response) {
              setQuiz(response);
              calculateResults(response);
            } else {
              console.error('Quiz not found');
            }
          } catch (error) {
            console.error('Error fetching quiz data:', error);
          }
        } else {
          console.error('Invalid quiz ID');
        }
      } else {
        console.error('Quiz ID is undefined');
      }
    };

    fetchQuiz();
  }, [id]);

  const calculateResults = (quiz: IQuiz) => {
    const userAnswers = location.state.answers || {};
    let correctCount = 0;
    let incorrectCount = 0;

    quiz.questions.forEach(question => {
      const userAnswerIds = userAnswers[question.id] ?? [];
      const correctAnswerIds = question.answers
        .filter(answer => answer.isCorrect)
        .map(answer => answer.id);

      const isCorrect =
        correctAnswerIds.length === userAnswerIds.length &&
        correctAnswerIds.every(id => userAnswerIds.includes(id));

      if (isCorrect) {
        correctCount += 1;
      } else {
        incorrectCount += 1;
      }
    });

    setCorrectAnswersCount(correctCount);
    setIncorrectAnswersCount(incorrectCount);
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link className="flex items-center gap-2 text-white rounded p-3 w-40 h-6 bg-gray" to="/">
        <svg style={{ width: '15px', height: '15px', fill: '#ffffff' }}>
          <use href={`${spriteSvg}#icon-home`}></use>
        </svg>
        To homepage
      </Link>
      <h1 className="text-2xl text-center font-bold mb-4">{quiz && quiz.name} - results</h1>
      <p className="font-bold flex items-center">Correct answers: {correctAnswersCount}</p>
      <p className="font-bold flex items-center">Incorrect answers: {incorrectAnswersCount}</p>
    </div>
  );
};

export default Results;
