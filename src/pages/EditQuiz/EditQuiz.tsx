import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import API from '../../servises/APIServise';

import { IQuiz, IQuestion, IAnswerOption } from '../../components/QuizForm/QuizForm';

const EditQuiz = () => {
  const { id } = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<IQuiz | null>(null);

  const navigate = useNavigate();

  // Імітація запиту на сервер
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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuiz(prevQuiz => (prevQuiz ? { ...prevQuiz, name: e.target.value } : null));
  };

  const handleQuestionChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (quiz) {
      const updatedQuestions = [...quiz.questions];
      updatedQuestions[index].text = e.target.value;
      setQuiz({ ...quiz, questions: updatedQuestions });
    }
  };

  const handleAnswerChange = (
    questionIndex: number,
    answerIndex: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (quiz) {
      const updatedQuestions = [...quiz.questions];
      updatedQuestions[questionIndex].answers[answerIndex].text = e.target.value;
      setQuiz({ ...quiz, questions: updatedQuestions });
    }
  };

  const handleMultipleAnswers = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (quiz) {
      setQuiz({ ...quiz, isMultipleAnswers: e.target.checked });
    }
  };

  const handleAbleToReturn = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (quiz) {
      setQuiz({ ...quiz, isAbleToReturn: e.target.checked });
    }
  };

  const handleIsTimer = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (quiz) {
      setQuiz({ ...quiz, isTimer: e.target.checked });
    }
  };

  const handleAddQuestion = () => {
    if (quiz) {
      const newQuestion: IQuestion = {
        id: Date.now(),
        text: '',
        answers: [],
      };
      setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion] });
    }
  };

  const handleRemoveQuestion = (index: number) => {
    if (quiz) {
      const updatedQuestions = quiz.questions.filter((_, i) => i !== index);
      setQuiz({ ...quiz, questions: updatedQuestions });
    }
  };

  const handleAddAnswer = (questionIndex: number) => {
    if (quiz) {
      const newAnswer: IAnswerOption = {
        id: Date.now(),
        text: '',
        isCorrect: false,
      };
      const updatedQuestions = [...quiz.questions];
      updatedQuestions[questionIndex].answers.push(newAnswer);
      setQuiz({ ...quiz, questions: updatedQuestions });
    }
  };

  const handleRemoveAnswer = (questionIndex: number, answerIndex: number) => {
    if (quiz) {
      const updatedQuestions = [...quiz.questions];
      updatedQuestions[questionIndex].answers = updatedQuestions[questionIndex].answers.filter(
        (_, i) => i !== answerIndex,
      );
      setQuiz({ ...quiz, questions: updatedQuestions });
    }
  };

  const handleCorrectAnswerChange = (questionId: number, answerId: number, isCorrect: boolean) => {
    if (quiz) {
      const updatedQuestions = quiz.questions.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: q.answers.map(answer =>
              answer.id === answerId ? { ...answer, isCorrect } : answer,
            ),
          };
        }
        return q;
      });

      setQuiz({ ...quiz, questions: updatedQuestions });
    }
  };

  const handleSubmit = async () => {
    if (quiz) {
      try {
        const response = await API.updateQuiz(quiz);
        if (response) {
          navigate(`/`);
        }
      } catch (error) {
        console.error('Failed to update quiz', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Quiz</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Quiz Name</label>
        <input
          type="text"
          value={quiz?.name}
          onChange={handleNameChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex">
        <p>Multiple answers: </p>
        <input
          type="checkbox"
          onChange={e => handleMultipleAnswers(e)}
          checked={quiz?.isMultipleAnswers}
        />
      </div>
      <div className="flex">
        <p>Return to previous question:</p>
        <input
          type="checkbox"
          onChange={e => handleAbleToReturn(e)}
          checked={quiz?.isAbleToReturn}
        />
      </div>
      <div className="flex">
        <p>Timer: </p>
        <input type="checkbox" onChange={e => handleIsTimer(e)} checked={quiz?.isTimer} />
      </div>
      {quiz?.questions.map((question, qIndex) => (
        <div key={question.id} className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Question {qIndex + 1}</label>
          <input
            type="text"
            value={question.text}
            onChange={e => handleQuestionChange(qIndex, e)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <button
            type="button"
            onClick={() => handleRemoveQuestion(qIndex)}
            className="mt-2 text-red-500 hover:text-red-700"
          >
            Remove Question
          </button>
          <div className="mt-4 space-y-2">
            {question.answers.map((answer, aIndex) => (
              <div key={answer.id} className="flex items-center">
                <input
                  type={quiz.isMultipleAnswers ? 'checkbox' : 'radio'}
                  checked={answer.isCorrect}
                  onChange={e =>
                    handleCorrectAnswerChange(question.id, answer.id, e.target.checked)
                  }
                />
                <input
                  type="text"
                  value={answer.text}
                  onChange={e => handleAnswerChange(qIndex, aIndex, e)}
                  className="flex-grow mr-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveAnswer(qIndex, aIndex)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddAnswer(qIndex)}
              className="mt-2 text-blue-500 hover:text-blue-700"
            >
              Add Answer
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddQuestion}
        className="mt-4 text-blue-500 hover:text-blue-700"
      >
        Add Question
      </button>
      <button
        type="button"
        onClick={handleSubmit}
        className="mt-6 block w-full bg-indigo-600 text-white py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Save Quiz
      </button>
    </div>
  );
};

export default EditQuiz;
