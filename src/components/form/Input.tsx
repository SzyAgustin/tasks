import React, { useContext } from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';
import styled from 'styled-components';
import { AppContext } from '../../context/AppContext';
interface InputProps {
  label: string;
  name: string;
  [x: string]: any;
}

const Input = ({ label, name, ...rest }: InputProps) => {
  const { darkMode } = useContext(AppContext);
  return (
    <InputDiv>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledField
        id={name}
        name={name}
        darkMode={darkMode}
        {...rest}
      ></StyledField>
      <ErrorMessage name={name}>
        {(error) => <TextError>{error}</TextError>}
      </ErrorMessage>
    </InputDiv>
  );
};

export default Input;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  margin-bottom: 1em;
  min-height: 75px;
`;

const StyledField = styled(Field)<InputProps>`
  background-color: ${(p) => (p.darkMode ? '#ffffff22' : '#006bae32')};
  padding: 0.5em 1em;
  border-radius: 3px;
  margin-bottom: 3px;
  user-select: none;
  border: none;
  font-size: 16px;
  color: ${(p) => (p.darkMode ? 'white' : 'black')};

  &:focus-visible {
    outline: none;
  }
`;

const StyledLabel = styled.label`
  margin-bottom: 2px;
  font-size: 12px;
`;
