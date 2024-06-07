import React, { useState, useEffect, useContext } from 'react';

import { SearchContext } from '../../components/SearchContext/SearchContext';
import { IQuiz } from '../../components/QuizForm/QuizForm';
import Button from '../../components/Button';
import ModalWrapper from '../../components/ModalWrapper';
import Modal from '../../components/Modal';
import Loader from '../../components/Loader';

import API from '../../servises/APIServise';

interface IModalData {
  name: string;
  id: number;
}

const Home: React.FC = () => {
  const [quizList, setQuizList] = useState<IQuiz[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<IModalData | null>(null);

  const searchContext = useContext(SearchContext);

  if (!searchContext) {
    throw new Error('HomePage must be used within a SearchProvider');
  }

  const { searchTerm } = searchContext;

  useEffect(() => {
    setLoader(true);
    const getAllQuizzes = async () => {
      try {
        const response = await API.getAllQuizzes();
        setQuizList(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };

    getAllQuizzes();
  }, []);

  useEffect(() => {
    setLoader(true);
    const findQuiz = async () => {
      try {
        const response = await API.findQuiz(searchTerm);
        setQuizList(response);
      } catch (error) {
        setQuizList([]);
      } finally {
        setLoader(false);
      }
    };

    findQuiz();
  }, [searchTerm]);

  const removeQuizHandler = async (id: number) => {
    if (id !== undefined) {
      try {
        setLoader(true);
        const response = await API.removeQuiz(id);
        setQuizList(response);
      } catch (error) {
        console.log(error);
      } finally {
        setOpenModal(false);
        setLoader(false);
      }
    }
  };

  const modalHeandler = (id: number, name: string) => {
    setModalData({ name, id });
    setOpenModal(true);
  };

  if (loader) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader name="icon-spinner" styles="w-16 h-16 fill-blue" />
      </div>
    );
  }

  return (
    <>
      <ul>
        {quizList.map(({ name, id, questions }) => (
          <li key={id} className="flex mb-1 w-full border-2 border-gray p-2 rounded bg-gray-light">
            <div className="flex-row">
              <div className="flex">
                <p className="text-5 font-semibold">
                  Quiz name: <span className="text-5 font-normal">{name}</span>
                </p>
              </div>
              <div className="flex">
                <p className="text-5 font-semibold">
                  Amount of questions:
                  <span className="text-5 font-normal"> {questions.length}</span>
                </p>
              </div>
            </div>
            <div className="flex ml-auto gap-1">
              <Button
                type="link"
                text="Pass quiz"
                to={`take-quiz/${id}`}
                className="block rounded bg-purple p-2 text-white font-semibold h-6"
              />
              <Button
                type="link"
                text="Edit quiz"
                to={`edit/${id}`}
                className="block rounded bg-orange p-2 text-white font-semibold h-6"
              />
              <Button
                imagePosition="beforeText"
                text="Delete quiz"
                onClick={() => modalHeandler(id, name)}
                className="flex items-center rounded bg-red p-2 text-white font-semibold h-6"
              />
            </div>
          </li>
        ))}
      </ul>
      <ModalWrapper open={openModal} onClose={() => setOpenModal(false)}>
        <Modal
          message={`Are you sure you want to delete: ${modalData?.name}?`}
          action={() => removeQuizHandler(modalData ? modalData.id : 0)}
          cancel={() => setOpenModal(false)}
        />
      </ModalWrapper>
    </>
  );
};

export default Home;
