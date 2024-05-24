import React, { useState } from "react";

import APIServise from "../../servises/APIServise";

interface IAnswerOption {
  id: number;
  text: string;
  isCorrect: boolean;
}

interface IQuestion {
  id: number;
  text: string;
  answers: IAnswerOption[];
}

export interface IQuiz {
  id: number;
  name: string;
  questions: IQuestion[];
}

const QuizForm: React.FC = () => {
  const [quizName, setQuizName] = useState<string>("");
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        text: "",
        answers: [{ id: Date.now(), text: "", isCorrect: false }],
      },
    ]);
  };

  const removeQuestion = (questionId: number) => {
    setQuestions(questions.filter((q) => q.id !== questionId));
  };

  const addAnswerOption = (questionId: number) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: [
              ...q.answers,
              { id: Date.now(), text: "", isCorrect: false },
            ],
          };
        }
        return q;
      })
    );
  };

  const removeAnswerOption = (questionId: number, answerId: number) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: [...q.answers].filter((a) => a.id !== answerId),
          };
        }
        return q;
      })
    );
  };

  const handleQuestionChange = (questionId: number, text: string) => {
    setQuestions(
      questions.map((q) => (q.id === questionId ? { ...q, text } : q))
    );
  };

  const handleAnswerChange = (
    questionId: number,
    answerId: number,
    text: string
  ) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: q.answers.map((answer) =>
              answer.id === answerId ? { ...answer, text } : answer
            ),
          };
        }
        return q;
      })
    );
  };

  const handleCorrectAnswerChange = (
    questionId: number,
    answerId: number,
    isCorrect: boolean
  ) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: q.answers.map((answer) =>
              answer.id === answerId ? { ...answer, isCorrect } : answer
            ),
          };
        }
        return q;
      })
    );
  };

  const handleSubmitForm = () => {
    setQuizName("");
    setQuestions([]);
    APIServise.addQuiz({
      name: quizName,
      id: Date.now(),
      questions,
    });
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Quiz Constructor</h1>
      <p>Type name of your Quiz </p>
      <input
        type="text"
        value={quizName}
        placeholder="Enter quiz name"
        onChange={(e) => setQuizName(e.target.value)}
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />

      {questions.map((question, index) => (
        <div key={question.id} className="mb-6">
          <p>Question №{index + 1}</p>
          <input
            type="text"
            placeholder="Enter question"
            value={question.text}
            onChange={(e) => handleQuestionChange(question.id, e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <button
            onClick={() => removeQuestion(question.id)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Remove question
          </button>
          {question.answers.map((answer) => (
            <div key={answer.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                onChange={(e) =>
                  handleCorrectAnswerChange(
                    question.id,
                    answer.id,
                    e.target.checked
                  )
                }
              />
              <input
                type="text"
                placeholder="Enter answer"
                value={answer.text}
                onChange={(e) =>
                  handleAnswerChange(question.id, answer.id, e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
              <button
                onClick={() => removeAnswerOption(question.id, answer.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Remove Answer Option
              </button>
            </div>
          ))}
          <button
            onClick={() => addAnswerOption(question.id)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Answer Option
          </button>
        </div>
      ))}
      <button
        onClick={addQuestion}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Add Question
      </button>
      {quizName !== "" && questions.length !== 0 && (
        <button
          onClick={handleSubmitForm}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create Quiz
        </button>
      )}
    </>
  );
};

export default QuizForm;
