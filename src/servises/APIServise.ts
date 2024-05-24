import { save, get, QUIZZES } from "../localStorage/localStorage";
import { IQuiz } from "../components/QuizForm/QuizForm";

class APIServise {
  addQuiz(quiz: IQuiz) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isNull = get(QUIZZES);
        if (isNull === null) {
          save(QUIZZES, [quiz]);
          resolve(get(QUIZZES));
        } else {
          const quizzes = get(QUIZZES);
          save(QUIZZES, [...quizzes, quiz]);
          resolve(get(QUIZZES));
        }
      }, 1000);
    });
  }

  getAllQuizzes() {
    return new Promise<IQuiz[]>((resolve, reject) => {
      setTimeout(() => {
        resolve(get(QUIZZES));
      }, 1000);
    });
  }

  removeQuiz(quizId: number) {
    return new Promise<IQuiz[]>((resolve, reject) => {
      setTimeout(() => {
        const quizzes = get(QUIZZES);
        quizzes.filter((quiz: IQuiz) => quiz.id !== quizId);
        save(QUIZZES, quizzes);
        resolve(get(QUIZZES));
      }, 1000);
    });
  }
}

const API = new APIServise();

export default API;
