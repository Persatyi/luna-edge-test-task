import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import Container from '../Container';
import Button from '../Button';
import { SearchContext } from '../SearchContext/SearchContext';

import spriteSvg from '../../assets/images/sprite/sprite.svg';

const Header: React.FC = () => {
  const searchContext = useContext(SearchContext);
  // const [localSearchTerm, setLocalSearchTerm] = useState<string>('');

  if (!searchContext) {
    throw new Error('Header must be used within a SearchProvider');
  }

  const { searchTerm, setSearchTerm } = searchContext;

  const handleSearchSubmit = () => {
    setSearchTerm(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <header className="pt-5 pb-5 bg-blue">
      <Container>
        <Link to="/">
          <h1 className="text-2xl text-white text-center font-bold">Welcome to Quiz</h1>
        </Link>
        <div className="flex">
          <label className="font-bold flex items-center text-white">
            Find quiz:
            <input
              value={searchTerm}
              onChange={e => handleSearchChange(e)}
              onKeyUp={handleKeyPress}
              placeholder="Search quizzes..."
              type="text"
              className="ml-1 w-18 h-8 border-gray rounded text-gray-dark p-1 pr-4"
            />
          </label>
          <button
            onClick={handleSearchSubmit}
            className="ml-2 p-2 bg-blue-500 text-white rounded-md"
          >
            <svg style={{ width: '20px', height: '20px', fill: '#ffffff' }}>
              <use href={`${spriteSvg}#icon-search`}></use>
            </svg>
          </button>
          <Button
            type="link"
            to="/create"
            text="Create new quiz"
            className="ml-auto block w-52 text-center font-semibold text-white border-white border-2 p-2 rounded bg-purple"
          />
        </div>
      </Container>
    </header>
  );
};

export default Header;
