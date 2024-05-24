import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { IQuiz } from "../../components/QuizForm/QuizForm";

import API from "../../servises/APIServise";

import Stepper from "../../components/Stepper";

const TakeTheQuiz = () => {
  const { id } = useParams<{ id: string }>();

  const [quiz, setQuiz] = useState<IQuiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

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
              console.log("Quiz is not found!");
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          console.error("Invalid quiz ID");
        }
      } else {
        console.error("Quiz ID is undefined");
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
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answerId,
    }));
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion.id];

  if (quiz !== null) {
    return (
      <div>
        <h1>{quiz.name}</h1>
        <div>
          <h2>{currentQuestion.text}</h2>
          <ul>
            {currentQuestion.answers.map((answer) => (
              <li key={answer.id}>
                <label>
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={answer.id}
                    checked={currentAnswer === answer.id}
                    onChange={() =>
                      handleAnswerChange(currentQuestion.id, answer.id)
                    }
                  />
                  {answer.text}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === quiz.questions.length - 1}
          >
            Next
          </button>
        </div>
        <Stepper
          totalSteps={quiz.questions.length}
          currentStep={currentQuestionIndex}
        />
      </div>
    );
  } else {
    return null;
  }
};

export default TakeTheQuiz;
