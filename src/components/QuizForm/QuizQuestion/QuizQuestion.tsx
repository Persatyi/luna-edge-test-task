import React from 'react';

import { IQuestion } from '../QuizForm';

import Button from '../../Button';

import spriteSvg from '../../../assets/images/sprite/sprite.svg';

interface IQuizQuestion {
  question: IQuestion;
  index: number;
  removeQuestion: (id: number) => void;
  handleQuestionChange: (id: number, value: string) => void;
  handleCorrectAnswerChange: (
    questionId: number,
    answerId: number,
    isCorrect: boolean,
    points?: number,
  ) => void;
  handleAnswerChange: (questionId: number, answerId: number, text: string) => void;
  removeAnswerOption: (questionId: number, answerId: number) => void;
  addAnswerOption: (questionId: number) => void;
}

const QuizQuestion: React.FC<IQuizQuestion> = ({
  question,
  index,
  removeQuestion,
  handleQuestionChange,
  handleCorrectAnswerChange,
  handleAnswerChange,
  removeAnswerOption,
  addAnswerOption,
}) => {
  return (
    <div className="mb-6 border-gray border-2 rounded p-2 bg-gray-light">
      <div className="flex mb-4">
        <p className="font-bold">Question №{index + 1}</p>
        <Button
          imagePosition="beforeText"
          image={
            <svg style={{ width: '12px', height: '12px', fill: '#ffffff' }}>
              <use href={`${spriteSvg}#icon-cross`}></use>
            </svg>
          }
          onClick={() => removeQuestion(question.id)}
          className="ml-auto bg-red text-white p-2 rounded"
          isText={false}
        />
      </div>
      <input
        type="text"
        placeholder="Enter question"
        value={question.text}
        onChange={e => handleQuestionChange(question.id, e.target.value)}
        className="w-full p-2 mb-2 border border-gray rounded"
      />
      {question.answers.map(answer => (
        <div key={answer.id} className="flex items-center mb-2 gap-1 ">
          <input
            className="w-14 h-14 rounded"
            type="checkbox"
            checked={answer.isCorrect}
            onChange={e => handleCorrectAnswerChange(question.id, answer.id, e.target.checked)}
          />
          {answer.isCorrect && (
            <input
              type="number"
              step="0.1"
              placeholder="Points"
              value={answer.points}
              onChange={e =>
                handleCorrectAnswerChange(
                  question.id,
                  answer.id,
                  answer.isCorrect,
                  parseFloat(e.target.value),
                )
              }
              className="w-24 p-2 border border-gray rounded"
            />
          )}

          <input
            type="text"
            placeholder="Enter answer"
            value={answer.text}
            onChange={e => handleAnswerChange(question.id, answer.id, e.target.value)}
            className="w-full p-2 border border-gray rounded"
          />
          <Button
            text="Remove"
            onClick={() => removeAnswerOption(question.id, answer.id)}
            className="bg-red text-xs text-white px-4 py-2 h-6 w-18 rounded"
          />
        </div>
      ))}
      <Button
        text="Add answer"
        onClick={() => addAnswerOption(question.id)}
        className="bg-blue text-white px-4 py-2 rounded"
      />
    </div>
  );
};

export default QuizQuestion;
