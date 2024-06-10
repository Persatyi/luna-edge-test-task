import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import API from '../../servises/APIServise';

import { IQuiz, IQuestion, IAnswerOption } from '../../components/QuizForm/QuizForm';
import Button from '../../components/Button';
import { QuizOption, QuizQuestion } from '../../components/QuizForm';

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

  const handleQuestionChange = (questionId: number, text: string) => {
    if (quiz) {
      const updatedQuestions = quiz.questions.map(q => (q.id === questionId ? { ...q, text } : q));
      setQuiz({ ...quiz, questions: updatedQuestions });
    }
  };

  const handleAnswerChange = (questionId: number, answerId: number, text: string) => {
    if (quiz) {
      const updatedQuestions = [...quiz.questions].map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: q.answers.map(answer =>
              answer.id === answerId ? { ...answer, text } : answer,
            ),
          };
        }
        return q;
      });
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
      setQuiz({ ...quiz, isTimerPerQuestion: e.target.checked, isAbleToReturn: false });
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

  const handleRemoveQuestion = (questionId: number) => {
    if (quiz) {
      const updatedQuestions = quiz.questions.filter(q => q.id !== questionId);
      setQuiz({ ...quiz, questions: updatedQuestions });
    }
  };

  const handleAddAnswer = (questionId: number) => {
    if (quiz) {
      const newAnswer: IAnswerOption = {
        id: Date.now(),
        text: '',
        isCorrect: false,
        points: 0,
      };

      const updatedQuestions = quiz.questions.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: [...q.answers, newAnswer],
          };
        }
        return q;
      });
      setQuiz({ ...quiz, questions: updatedQuestions });
    }
  };

  const handleRemoveAnswer = (questionId: number, answerId: number) => {
    if (quiz) {
      const updatedQuestions = [...quiz.questions].map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: [...q.answers].filter(a => a.id !== answerId),
          };
        }
        return q;
      });

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
      <Button
        type="link"
        className="flex items-center gap-2 text-white rounded p-3 w-40 h-6 bg-gray"
        to="/"
        text="To homepage"
        image={
          <svg style={{ width: '15px', height: '15px', fill: '#ffffff' }}>
            <use href={`${spriteSvg}#icon-home`}></use>
          </svg>
        }
        imagePosition="beforeText"
      />
      <h1 className="text-2xl text-center font-bold mb-4">Edit Quiz</h1>
      <div className="flex items-center">
        <QuizOption
          inputClassName="ml-1 w-4 h-4"
          labelClassName="font-bold flex items-center"
          text="Multiple answers: "
          type="checkbox"
          onChange={e => handleMultipleAnswers(e)}
          checked={quiz?.isMultipleAnswers ? quiz.isMultipleAnswers : false}
        />
      </div>
      <div className="flex items-center">
        <QuizOption
          labelClassName="font-bold flex items-center"
          inputClassName="ml-1 w-4 h-4"
          text="Return to previous question: "
          type="checkbox"
          onChange={e => handleAbleToReturn(e)}
          checked={quiz?.isAbleToReturn ? quiz.isAbleToReturn : false}
          disabled={quiz?.isTimerPerQuestion ? true : false}
        />
      </div>
      {!quiz?.isTimerPerQuestion && (
        <div className="flex items-center">
          <QuizOption
            inputClassName="ml-1 w-4 h-4"
            labelClassName="font-bold flex items-center"
            text="Timer: "
            type="checkbox"
            onChange={e => handleIsTimer(e)}
            checked={quiz?.isTimer ? quiz.isTimer : false}
          />
          {quiz?.isTimer && (
            <QuizOption
              type="number"
              placeholder="Seconds"
              value={!!quiz.quizDuration ? quiz.quizDuration : undefined}
              onChange={e => handleTimerChange(e)}
              text="Type amount of seconds: "
              inputClassName="ml-2 w-32 h-5  p-2 border border-gray rounded font-normal"
              labelClassName="ml-4 font-bold flex items-center"
            />
          )}
        </div>
      )}
      {!quiz?.isTimer && (
        <div className="flex items-center">
          <QuizOption
            text="Timer per question: "
            inputClassName="ml-1 w-4 h-4"
            labelClassName="font-bold flex items-center"
            type="checkbox"
            checked={quiz?.isTimerPerQuestion ? quiz.isTimerPerQuestion : false}
            disabled={quiz?.isAbleToReturn ? true : false}
            onChange={e => setIsTimerPerQuestion(e)}
          />
          {quiz?.isTimerPerQuestion && (
            <QuizOption
              labelClassName="ml-4 font-bold flex items-center"
              inputClassName="ml-2 w-32 h-5 p-2 border border-gray rounded font-normal"
              text="Type amount of seconds: "
              type="number"
              placeholder="Seconds"
              value={!!quiz.questionDuration ? quiz.questionDuration : undefined}
              onChange={e => handleTimerChangePerQuestion(e)}
            />
          )}
        </div>
      )}
      <div className="mb-4">
        <QuizOption
          inputClassName="w-full p-2 mb-2 border border-gray rounded"
          labelClassName="block text-sm font-bold"
          text="Quiz Name"
          type="text"
          value={!!quiz?.name ? quiz.name : ''}
          onChange={handleNameChange}
        />
      </div>
      {quiz?.questions.map((question, qIndex) => (
        <QuizQuestion
          key={question.id}
          question={question}
          index={qIndex}
          removeQuestion={handleRemoveQuestion}
          handleQuestionChange={handleQuestionChange}
          handleCorrectAnswerChange={handleCorrectAnswerChange}
          handleAnswerChange={handleAnswerChange}
          removeAnswerOption={handleRemoveAnswer}
          addAnswerOption={handleAddAnswer}
        />
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
