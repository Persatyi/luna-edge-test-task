import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { IQuiz } from '../../components/QuizForm/QuizForm';

import API from '../../servises/APIServise';

import Stepper from '../../components/Stepper';
import Button from '../../components/Button';
import Timer from '../../components/Timer';
import Loader from '../../components/Loader';

const TakeTheQuiz = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<IQuiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number[]>>({});
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (quiz?.isTimer || (!quiz?.isTimer && !quiz?.isTimerPerQuestion)) {
      return;
    }

    setKey(prevKey => prevKey + 1); // Increment key to reset timer
  }, [currentQuestionIndex, quiz]);

  useEffect(() => {
    const getQuiz = async () => {
      if (id !== undefined) {
        const parsedId = Number.parseInt(id);

        if (!isNaN(parsedId)) {
          try {
            const response = await API.getQuizById(parsedId);

            if (response !== undefined) {
              setQuiz(response);
            } else {
              console.log('Quiz is not found!');
            }
          } catch (error) {
            console.log('Error fetching quiz data:', error);
          }
        } else {
          console.error('Invalid quiz ID');
        }
      } else {
        console.error('Quiz ID is undefined');
      }
    };

    getQuiz();
  }, [id]);

  const handleNextQuestion = () => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerChange = (questionId: number, answerId: number) => {
    setAnswers(prevAnswers => {
      const currentAnswers = prevAnswers[questionId] || [];

      let updatedAnswers;

      if (quiz?.isMultipleAnswers) {
        if (currentAnswers.includes(answerId)) {
          // Видалення відповіді, якщо вона вже обрана
          updatedAnswers = currentAnswers.filter(id => id !== answerId);
        } else {
          // Додавання відповіді, якщо вона ще не обрана
          updatedAnswers = [...currentAnswers, answerId];
        }
      } else {
        // Якщо можливий тільки одиночний вибір
        updatedAnswers = [answerId];
      }

      return {
        ...prevAnswers,
        [questionId]: updatedAnswers,
      };
    });
  };

  const handleFinishQuiz = () => {
    if (quiz) {
      navigate(`/results/${quiz.id}`, { state: { answers } });
    }
  };

  if (!quiz) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader name="icon-spinner" styles="w-16 h-16 fill-blue" />
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion.id] || [];

  if (quiz !== null) {
    return (
      <div>
        <h1 className="text-2xl text-center font-bold mb-4">{quiz.name}</h1>
        {quiz.isTimer && (
          <Timer duration={quiz.quizDuration} onTimeUp={handleFinishQuiz} key={key} />
        )}
        {quiz.isTimerPerQuestion && (
          <Timer
            duration={quiz.questionDuration}
            onTimeUp={
              currentQuestionIndex === quiz.questions.length - 1
                ? handleFinishQuiz
                : handleNextQuestion
            }
            key={key}
          />
        )}
        <div>
          <h2 className="font-bold mb-1">{currentQuestion.text}</h2>
          <ul>
            {currentQuestion.answers.map(answer => (
              <li key={answer.id} className="mb-2 border-gray border-2 rounded p-2">
                <label className="flex items-center text-base">
                  <input
                    type={quiz.isMultipleAnswers ? 'checkbox' : 'radio'}
                    name={`question-${currentQuestion.id}`}
                    value={answer.id}
                    checked={currentAnswer.includes(answer.id)}
                    onChange={() => handleAnswerChange(currentQuestion.id, answer.id)}
                    className="w-4 h-4 rounded mr-2"
                  />
                  {answer.text}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div>
          {currentQuestionIndex !== 0 && quiz.isAbleToReturn && (
            <Button
              text="Previous"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="bg-blue text-white p-4 py-2 rounded mr-1"
            />
          )}
          {currentQuestionIndex === quiz.questions.length - 1 ? (
            <Button
              text="Finish"
              onClick={handleFinishQuiz}
              className="bg-green text-white p-4 py-2 rounded"
            />
          ) : (
            <Button
              text="Next"
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === quiz.questions.length - 1}
              className="bg-blue text-white p-4 py-2 rounded"
            />
          )}
        </div>
        <Stepper totalSteps={quiz.questions.length} currentStep={currentQuestionIndex} />
      </div>
    );
  } else {
    return null;
  }
};

export default TakeTheQuiz;
