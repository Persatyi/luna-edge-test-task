import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import API from '../../servises/APIServise';

import { IQuiz, IQuestion, IAnswerOption } from '../../components/QuizForm/QuizForm';
import Button from '../../components/Button';

import spriteSvg from '../../assets/images/sprite/sprite.svg';

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
      setQuiz({ ...quiz, isAbleToReturn: e.target.checked, isTimerPerQuestion: false });
    }
  };

  const handleIsTimer = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (quiz) {
      setQuiz({ ...quiz, isTimer: e.target.checked });
    }
  };

  const handleTimerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (quiz) {
      setQuiz({ ...quiz, quizDuration: Number.parseInt(e.target.value) });
    }
  };

  const setIsTimerPerQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (quiz) {
      setQuiz({ ...quiz, isTimerPerQuestion: e.target.checked });
    }
  };

  const handleTimerChangePerQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (quiz) {
      setQuiz({ ...quiz, questionDuration: Number.parseInt(e.target.value) });
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
        points: 0,
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

  const handleCorrectAnswerChange = (
    questionId: number,
    answerId: number,
    isCorrect: boolean,
    points: number = 0,
  ) => {
    if (quiz) {
      const updatedQuestions = quiz.questions.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: q.answers.map(answer =>
              answer.id === answerId ? { ...answer, isCorrect, points } : answer,
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
    <>
      <Link className="flex items-center gap-2 text-white rounded p-3 w-40 h-6 bg-gray" to="/">
        <svg style={{ width: '15px', height: '15px', fill: '#ffffff' }}>
          <use href={`${spriteSvg}#icon-home`}></use>
        </svg>
        To homepage
      </Link>
      <h1 className="text-2xl text-center font-bold mb-4">Edit Quiz</h1>

      <div className="flex items-center">
        <label className="font-bold flex items-center">
          Multiple answers:
          <input
            className="ml-1 w-4 h-4"
            type="checkbox"
            onChange={e => handleMultipleAnswers(e)}
            checked={quiz?.isMultipleAnswers}
          />
        </label>
      </div>
      <div className="flex items-center">
        <label className="font-bold flex items-center">
          Return to previous question:
          <input
            className="ml-1 w-4 h-4"
            type="checkbox"
            onChange={e => handleAbleToReturn(e)}
            checked={quiz?.isAbleToReturn}
            disabled={quiz?.isTimerPerQuestion ? true : false}
          />
        </label>
      </div>
      {!quiz?.isTimerPerQuestion && (
        <div className="flex items-center">
          <label className="font-bold flex items-center">
            Timer:
            <input
              className="ml-1 w-4 h-4 text-blue-600 bg-gray border-gray rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              type="checkbox"
              onChange={e => handleIsTimer(e)}
              checked={quiz?.isTimer}
            />
          </label>
          {quiz?.isTimer && (
            <label className="ml-4 font-bold flex items-center">
              Type amount of seconds:
              <input
                type="number"
                placeholder="Seconds"
                value={quiz.quizDuration}
                onChange={e => handleTimerChange(e)}
                className="ml-2 w-32 h-5  p-2 border border-gray rounded font-normal"
              />
            </label>
          )}
        </div>
      )}
      {!quiz?.isTimer && (
        <div className="flex items-center">
          <label className="font-bold flex items-center">
            Timer per question:
            <input
              className="ml-1 w-4 h-4"
              type="checkbox"
              checked={quiz?.isTimerPerQuestion}
              disabled={quiz?.isAbleToReturn ? true : false}
              onChange={e => setIsTimerPerQuestion(e)}
            />
          </label>
          {quiz?.isTimerPerQuestion && (
            <label className="ml-4 font-bold flex items-center">
              Type amount of seconds:
              <input
                type="number"
                placeholder="Seconds"
                value={quiz.questionDuration}
                onChange={e => handleTimerChangePerQuestion(e)}
                className="ml-2 w-32 h-5  p-2 border border-gray rounded font-normal"
              />
            </label>
          )}
        </div>
      )}
      <div className="mb-4">
        <label className="block text-sm font-bold ">Quiz Name</label>
        <input
          type="text"
          value={quiz?.name}
          onChange={handleNameChange}
          className="w-full p-2 mb-2 border border-gray rounded"
        />
      </div>
      {quiz?.questions.map((question, qIndex) => (
        <div key={question.id} className="mb-6 border-gray bg-gray-light border-2 rounded p-2">
          <div className="flex mb-3">
            <p className="font-bold">Question {qIndex + 1}</p>
            <Button
              isText={false}
              onClick={() => handleRemoveQuestion(qIndex)}
              className="ml-auto bg-red text-white p-2 rounded"
              imagePosition="beforeText"
              image={
                <svg style={{ width: '12px', height: '12px', fill: '#ffffff' }}>
                  <use href={`${spriteSvg}#icon-cross`}></use>
                </svg>
              }
            />
          </div>
          <input
            type="text"
            value={question.text}
            onChange={e => handleQuestionChange(qIndex, e)}
            className="w-full p-2 mb-2 border border-gray rounded"
          />
          <div className="mt-4 space-y-2">
            {question.answers.map((answer, aIndex) => (
              <div key={answer.id} className="flex items-center mb-2 gap-1">
                <input
                  className="w-14 h-14 rounded"
                  type="checkbox"
                  checked={answer.isCorrect}
                  onChange={e =>
                    handleCorrectAnswerChange(question.id, answer.id, e.target.checked)
                  }
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
                  value={answer.text}
                  onChange={e => handleAnswerChange(qIndex, aIndex, e)}
                  className="w-full p-2 border border-gray rounded"
                />
                <Button
                  text="Remove"
                  onClick={() => handleRemoveAnswer(qIndex, aIndex)}
                  className="bg-red text-xs text-white px-4 py-2 h-6 w-18 rounded"
                />
              </div>
            ))}
            <Button
              text="Add answer"
              onClick={() => handleAddAnswer(qIndex)}
              className="bg-blue text-white px-4 py-2 rounded"
            />
          </div>
        </div>
      ))}
      <div className="flex gap-2">
        <Button
          text="Add Question"
          onClick={handleAddQuestion}
          className="bg-blue text-white px-4 py-2 rounded"
        />
        <Button
          text="Save Changes"
          onClick={handleSubmit}
          className="bg-green text-white px-4 py-2 rounded"
        />
      </div>
    </>
  );
};

export default EditQuiz;
