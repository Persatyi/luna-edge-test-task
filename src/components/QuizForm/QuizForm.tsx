import React, { useState } from 'react';

import API from '../../servises/APIServise';

import Button from '../Button';
import QuizQuestion from './QuizQuestion';
import spriteSvg from '../../assets/images/sprite/sprite.svg';

export interface IAnswerOption {
  id: number;
  text: string;
  isCorrect: boolean;
  points: number;
}

export interface IQuestion {
  id: number;
  text: string;
  answers: IAnswerOption[];
}

export interface IQuiz {
  isMultipleAnswers: boolean;
  isAbleToReturn: boolean;
  isTimer: boolean;
  isTimerPerQuestion: boolean;
  id: number;
  name: string;
  questions: IQuestion[];
  quizDuration: number;
  questionDuration: number;
}

const QuizForm: React.FC = () => {
  const [quizName, setQuizName] = useState<string>('');
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const [isMultipleAnswers, setIsMultipleAnswers] = useState<boolean>(false);
  const [isAbleToReturn, setIsAbleToReturn] = useState<boolean>(false);
  const [isTimer, setIsTimer] = useState<boolean>(false);
  const [isTimerPerQuestion, setIsTimerPerQuestion] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        text: '',
        answers: [{ id: Date.now(), text: '', isCorrect: false, points: 0 }],
      },
    ]);
  };

  const removeQuestion = (questionId: number) => {
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  const addAnswerOption = (questionId: number) => {
    setQuestions(
      questions.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: [...q.answers, { id: Date.now(), text: '', isCorrect: false, points: 0 }],
          };
        }
        return q;
      }),
    );
  };

  const removeAnswerOption = (questionId: number, answerId: number) => {
    setQuestions(
      questions.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: [...q.answers].filter(a => a.id !== answerId),
          };
        }
        return q;
      }),
    );
  };

  const handleQuestionChange = (questionId: number, text: string) => {
    setQuestions(questions.map(q => (q.id === questionId ? { ...q, text } : q)));
  };

  const handleAnswerChange = (questionId: number, answerId: number, text: string) => {
    setQuestions(
      questions.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: q.answers.map(answer =>
              answer.id === answerId ? { ...answer, text } : answer,
            ),
          };
        }
        return q;
      }),
    );
  };

  const handleCorrectAnswerChange = (
    questionId: number,
    answerId: number,
    isCorrect: boolean,
    points: number = 0,
  ) => {
    setQuestions(
      questions.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: q.answers.map(answer =>
              answer.id === answerId ? { ...answer, isCorrect, points } : answer,
            ),
          };
        }
        return q;
      }),
    );
  };

  const handleAbilityToReturn = (checked: boolean) => {
    setIsAbleToReturn(checked);
    setIsTimerPerQuestion(false);
  };

  const handleTimerPerQuestion = (checked: boolean) => {
    setIsTimerPerQuestion(checked);
    setIsAbleToReturn(false);
  };

  const handleTimerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number.isNaN(e.target.value)) {
      setTimer(0);
      return;
    }

    setTimer(Number.parseInt(e.target.value));
  };

  const handleSubmitForm = () => {
    setQuizName('');
    setQuestions([]);
    const quizTimer = isTimer ? timer : 0;
    const questionTimer = isTimerPerQuestion ? timer : 0;
    API.addQuiz({
      name: quizName,
      id: Date.now(),
      questions,
      isMultipleAnswers,
      isAbleToReturn,
      isTimer,
      isTimerPerQuestion,
      questionDuration: questionTimer,
      quizDuration: quizTimer,
    });
  };

  return (
    <section className="pt-5 pb-5">
      <div className="mb-3 gap-2">
        <Button
          type="link"
          text="To homepage"
          to="/"
          image={
            <svg style={{ width: '15px', height: '15px', fill: '#ffffff' }}>
              <use href={`${spriteSvg}#icon-home`}></use>
            </svg>
          }
          imagePosition="beforeText"
          className="flex items-center gap-2 text-white rounded p-3 w-40 h-6 bg-gray"
        />
        <h1 className="text-2xl text-center font-bold mb-4">Quiz Constructor</h1>
        <div className="flex items-center">
          <label className="font-bold flex items-center">
            Multiple answers:
            <input
              className="ml-1 w-4 h-4"
              type="checkbox"
              checked={isMultipleAnswers}
              onChange={e => setIsMultipleAnswers(e.target.checked)}
            />
          </label>
        </div>
        <div className="flex items-center">
          <label className="font-bold flex items-center">
            Return to previous question:
            <input
              className="ml-1 w-4 h-4"
              type="checkbox"
              disabled={isTimerPerQuestion ? true : false}
              checked={isAbleToReturn}
              onChange={e => handleAbilityToReturn(e.target.checked)}
            />
          </label>
        </div>
        {!isTimerPerQuestion && (
          <div className="flex items-center">
            <label className="font-bold flex items-center">
              Timer:
              <input
                className="ml-1 w-4 h-4 text-blue-600 bg-gray border-gray rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                type="checkbox"
                checked={isTimer}
                onChange={e => setIsTimer(e.target.checked)}
              />
            </label>
            {isTimer && (
              <label className="ml-4 font-bold flex items-center">
                Type amount of seconds:
                <input
                  type="number"
                  placeholder="Seconds"
                  value={timer}
                  onChange={e => handleTimerChange(e)}
                  className="ml-2 w-32 h-5 p-2 border border-gray rounded font-normal"
                />
              </label>
            )}
          </div>
        )}
        {!isTimer && (
          <div className="flex items-center">
            <label className="font-bold flex items-center">
              Timer per question:
              <input
                disabled={isAbleToReturn ? true : false}
                className="ml-1 w-4 h-4"
                type="checkbox"
                checked={isTimerPerQuestion}
                onChange={e => handleTimerPerQuestion(e.target.checked)}
              />
            </label>
            {isTimerPerQuestion && (
              <label className="ml-4 font-bold flex items-center">
                Type amount of seconds:
                <input
                  type="number"
                  placeholder="Seconds"
                  value={timer}
                  onChange={e => handleTimerChange(e)}
                  className="ml-2 w-32 h-5  p-2 border border-gray rounded font-normal"
                />
              </label>
            )}
          </div>
        )}
      </div>
      <div>
        <p className="font-bold mb-1">Type name of your Quiz </p>
        <input
          type="text"
          value={quizName}
          placeholder="Enter quiz name"
          onChange={e => setQuizName(e.target.value)}
          className="w-full p-2 mb-2 border border-gray rounded"
        />
      </div>

      {questions.map((question, index) => (
        <QuizQuestion
          key={question.id}
          question={question}
          index={index}
          removeQuestion={removeQuestion}
          handleQuestionChange={handleQuestionChange}
          handleCorrectAnswerChange={handleCorrectAnswerChange}
          handleAnswerChange={handleAnswerChange}
          removeAnswerOption={removeAnswerOption}
          addAnswerOption={addAnswerOption}
        />
      ))}

      <div className="flex gap-2">
        <Button
          text="Add Question"
          onClick={addQuestion}
          className="bg-purple text-white px-4 py-2 rounded"
        />
        {quizName !== '' && questions.length !== 0 && (
          <Button
            text="Finish creating & save"
            onClick={handleSubmitForm}
            className="bg-green text-white px-4 py-2 rounded"
          />
        )}
      </div>
    </section>
  );
};

export default QuizForm;
