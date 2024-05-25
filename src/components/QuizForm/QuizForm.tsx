import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import APIServise from '../../servises/APIServise';

import Button from '../Button';
import spriteSvg from '../../assets/images/sprite/sprite.svg';

export interface IAnswerOption {
  id: number;
  text: string;
  isCorrect: boolean;
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
  id: number;
  name: string;
  questions: IQuestion[];
}

const QuizForm: React.FC = () => {
  const [quizName, setQuizName] = useState<string>('');
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const [isMultipleAnswers, setIsMultipleAnswers] = useState<boolean>(false);
  const [isAbleToReturn, setIsAbleToReturn] = useState<boolean>(false);
  const [isTimer, setIsTimer] = useState<boolean>(false);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        text: '',
        answers: [{ id: Date.now(), text: '', isCorrect: false }],
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
            answers: [...q.answers, { id: Date.now(), text: '', isCorrect: false }],
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

  const handleCorrectAnswerChange = (questionId: number, answerId: number, isCorrect: boolean) => {
    setQuestions(
      questions.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: q.answers.map(answer =>
              answer.id === answerId ? { ...answer, isCorrect } : answer,
            ),
          };
        }
        return q;
      }),
    );
  };

  const handleSubmitForm = () => {
    setQuizName('');
    setQuestions([]);
    APIServise.addQuiz({
      name: quizName,
      id: Date.now(),
      questions,
      isMultipleAnswers,
      isAbleToReturn,
      isTimer,
    });
  };

  return (
    <section className="pt-5 pb-5">
      <div className="mb-3 gap-2">
        <Link className="flex items-center gap-2 text-white rounded p-3 w-40 h-6 bg-gray" to="/">
          <svg style={{ width: '15px', height: '15px', fill: '#ffffff' }}>
            <use href={`${spriteSvg}#icon-home`}></use>
          </svg>
          To homepage
        </Link>
        <h1 className="text-2xl text-center font-bold mb-4">Quiz Constructor</h1>
        <div className="flex items-center">
          <label className="font-bold flex items-center">
            Multiple answers:
            <input
              className="ml-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              type="checkbox"
              onChange={e => setIsMultipleAnswers(e.target.checked)}
            />
          </label>
        </div>
        <div className="flex items-center">
          <label className="font-bold flex items-center">
            Return to previous question:
            <input
              className="ml-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              type="checkbox"
              onChange={e => setIsAbleToReturn(e.target.checked)}
            />
          </label>
        </div>
        <div className="flex items-center">
          <label className="font-bold flex items-center">
            Timer:
            <input
              className="ml-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              type="checkbox"
              onChange={e => setIsTimer(e.target.checked)}
            />
          </label>
        </div>
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
        <div key={question.id} className="mb-6 border-gray border-2 rounded p-2">
          <div className="flex mb-4">
            <p className="font-bold">Question №{index + 1}</p>
            <button
              onClick={() => removeQuestion(question.id)}
              className="ml-auto bg-red text-white p-2 rounded"
            >
              <svg style={{ width: '12px', height: '12px', fill: '#ffffff' }}>
                <use href={`${spriteSvg}#icon-cross`}></use>
              </svg>
            </button>
          </div>
          <input
            type="text"
            placeholder="Enter question"
            value={question.text}
            onChange={e => handleQuestionChange(question.id, e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          {question.answers.map(answer => (
            <div key={answer.id} className="flex items-center mb-2 gap-1">
              <input
                className="w-14 h-14 rounded"
                type="checkbox"
                onChange={e => handleCorrectAnswerChange(question.id, answer.id, e.target.checked)}
              />
              <input
                type="text"
                placeholder="Enter answer"
                value={answer.text}
                onChange={e => handleAnswerChange(question.id, answer.id, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <Button
                text="Remove answer"
                onClick={() => removeAnswerOption(question.id, answer.id)}
                className="bg-red text-white px-4 py-2 h-6 w-48 rounded"
              />
            </div>
          ))}
          <Button
            text="Add answer option"
            onClick={() => addAnswerOption(question.id)}
            className="bg-blue text-white px-4 py-2 rounded"
          />
        </div>
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
