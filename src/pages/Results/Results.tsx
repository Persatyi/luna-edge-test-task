import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import API from "../../servises/APIServise";

import { IQuiz } from "../../components/QuizForm/QuizForm";

import Button from "../../components/Button/Button";

interface ILocationState {
  answers: Record<number, number>;
}

const Results = () => {
  const { id } = useParams<{ id?: string }>();
  const location = useLocation();
  const [quiz, setQuiz] = useState<IQuiz | null>(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [incorrectAnswersCount, setIncorrectAnswersCount] = useState<number>(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (id !== undefined) {
        const parsedId = Number.parseInt(id, 10);
        if (!isNaN(parsedId)) {
          try {
            const response = await API.getQuizById(parsedId);
            if (response) {
              setQuiz(response);
              calculateResults(response);
            } else {
              console.error("Quiz not found");
            }
          } catch (error) {
            console.error("Error fetching quiz data:", error);
          }
        } else {
          console.error("Invalid quiz ID");
        }
      } else {
        console.error("Quiz ID is undefined");
      }
    };

    fetchQuiz();
  }, [id]);

  const calculateResults = (quiz: IQuiz) => {
    const userAnswers = location.state.answers || {};
    let correctCount = 0;
    let incorrectCount = 0;

    quiz.questions.forEach((question) => {
      const userAnswerIds = userAnswers[question.id] ?? [];
      const correctAnswerIds = question.answers
        .filter((answer) => answer.isCorrect)
        .map((answer) => answer.id);

      const isCorrect =
        correctAnswerIds.length === userAnswerIds.length &&
        correctAnswerIds.every((id) => userAnswerIds.includes(id));

      if (isCorrect) {
        correctCount += 1;
      } else {
        incorrectCount += 1;
      }
    });

    setCorrectAnswersCount(correctCount);
    setIncorrectAnswersCount(incorrectCount);
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{quiz && quiz.name} - Results</h1>
      <p>Correct answers: {correctAnswersCount}</p>
      <p>Incorrect answers: {incorrectAnswersCount}</p>
      <Button type="link" text="Back to homepage" to={"/"} />
    </div>
  );
};

export default Results;
