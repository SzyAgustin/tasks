import React, { useContext } from 'react';
import styled from 'styled-components';
import { TaskBox } from './Task';
import { AppContext } from '../context/AppContext';
import { BiSearch } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import TransitionIcons from './TransitionIcons';

const SearchBar = () => {
  const { darkMode, searchValue, setSearchValue } = useContext(AppContext);

  return (
    <SearchBarBox>
      <TaskBox darkMode={darkMode}>
        <Input
          darkMode={darkMode}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type='text'
          placeholder='Buscar tarea...'
          autoFocus
        />
        <TransitionIcons
          showFirst={searchValue === ''}
          first={<BiSearch />}
          second={<IoMdCloseStyled onClick={() => setSearchValue('')} />}
        />
      </TaskBox>
    </SearchBarBox>
  );
};

export default SearchBar;

const SearchBarBox = styled.div`
  width: 64%;
  margin: 30px auto;
`;

interface InputProps {
  darkMode: boolean;
  loading?: boolean;
  disabled?: boolean;
}

const Input = styled.input<InputProps>`
  transition: 0.4s;
  font-size: 14px;
  width: 95%;
  background-color: transparent;
  border: 0px;
  color: ${(p) => (p.darkMode ? 'white' : 'rgb(4, 34, 78)')};

  &:focus-visible {
    border: transparent;
    outline: none;
  }

  &::placeholder {
    transition: 0.4s;
    color: ${(p) => (p.darkMode ? 'white' : 'rgb(4, 34, 78)')};
    font-style: oblique;
  }
`;

const IoMdCloseStyled = styled(IoMdClose)`
  cursor: pointer;
`;
