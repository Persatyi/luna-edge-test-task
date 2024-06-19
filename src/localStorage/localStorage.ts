const save = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    return null;
  }
};

const get = (key: string) => {
  try {
    return JSON.parse(localStorage.getItem(key) || '');
  } catch (error) {
    return null;
  }
};

const remove = (key: string) => {
  try {
    return localStorage.removeItem(key);
  } catch (error) {
    return null;
  }
};

const QUIZZES = 'quizzes';
const NEW_QUIZ = 'newQuiz';

export { get, save, remove, QUIZZES, NEW_QUIZ };
