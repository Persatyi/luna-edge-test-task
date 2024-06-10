import React from 'react';

import Button from '../../Button';

import { IAnswerOption } from '../QuizForm';

interface IQuizAnswer {
  answer: IAnswerOption;
  questionId: number;
  handleCorrectAnswerChange: (
    questionId: number,
    answerId: number,
    isCorrect: boolean,
    points?: number,
  ) => void;
  handleAnswerChange: (questionId: number, answerId: number, text: string) => void;
  removeAnswerOption: (questionId: number, answerId: number) => void;
}

const QuizAnswer: React.FC<IQuizAnswer> = ({
  answer,
  questionId,
  handleCorrectAnswerChange,
  handleAnswerChange,
  removeAnswerOption,
}) => {
  return (
    <div className="flex items-center mb-2 gap-1 ">
      <input
        className="w-14 h-14 rounded"
        type="checkbox"
        checked={answer.isCorrect}
        onChange={e => handleCorrectAnswerChange(questionId, answer.id, e.target.checked)}
      />
      {answer.isCorrect && (
        <input
          type="number"
          step="0.1"
          placeholder="Points"
          value={answer.points}
          onChange={e =>
            handleCorrectAnswerChange(
              questionId,
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
        onChange={e => handleAnswerChange(questionId, answer.id, e.target.value)}
        className="w-full p-2 border border-gray rounded"
      />
      <Button
        text="Remove"
        onClick={() => removeAnswerOption(questionId, answer.id)}
        className="bg-red text-xs text-white px-4 py-2 h-6 w-18 rounded"
      />
    </div>
  );
};

export default QuizAnswer;
