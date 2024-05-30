import { save, get, QUIZZES } from '../localStorage/localStorage';
import { IQuiz } from '../components/QuizForm/QuizForm';

class APIServise {
  private delay = 1000;
  isLoading = false;

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
      }, this.delay);
    });
  }

  getAllQuizzes() {
    this.isLoading = true;
    return new Promise<IQuiz[]>((resolve, reject) => {
      setTimeout(() => {
        const isNull = get(QUIZZES);

        if (isNull === null) {
          reject('localStorage is empty');
        } else {
          resolve(get(QUIZZES));
        }
      }, this.delay);
    }).finally(() => {
      this.isLoading = false;
    });
  }

  getQuizById(id: number) {
    return new Promise<IQuiz | undefined>((resolve, reject) => {
      setTimeout(() => {
        const quizList: IQuiz[] = get(QUIZZES);
        const quiz: IQuiz | undefined = quizList.find(quiz => quiz.id === id);

        if (quiz === undefined) {
          reject(new Error('Quiz not found'));
        }

        resolve(quiz);
      }, this.delay);
    });
  }

  removeQuiz(quizId: number) {
    return new Promise<IQuiz[]>((resolve, reject) => {
      setTimeout(() => {
        const quizzes = get(QUIZZES);
        const quiz = quizzes.filter((quiz: IQuiz) => quiz.id !== quizId);
        save(QUIZZES, quiz);
        resolve(get(QUIZZES));
      }, this.delay);
    });
  }

  updateQuiz(quiz: IQuiz) {
    return new Promise((response, reject) => {
      setTimeout(() => {
        const quizzes: IQuiz[] = get(QUIZZES);
        const updatedlist = quizzes.map(item => (item.id === quiz.id ? quiz : item));
        save(QUIZZES, updatedlist);

        response(updatedlist);
      }, this.delay);
    });
  }

  findQuiz(query: string) {
    return new Promise<IQuiz[]>((response, reject) => {
      setTimeout(() => {
        const quizzes: IQuiz[] = get(QUIZZES);
        if (quizzes === null) {
          reject('localStorage is empty');
        } else {
          const filteredQuizes: IQuiz[] = [];
          quizzes.forEach(el => {
            if (el.name.toLowerCase().includes(query.toLowerCase())) {
              filteredQuizes.push(el);
            }
          });

          if (filteredQuizes.length !== 0) {
            response(filteredQuizes);
          } else {
            reject('No matches found.');
          }
        }
      }, this.delay);
    });
  }
}

const API = new APIServise();

export default API;
