import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';
import styled from 'styled-components';

interface InputProps {
  label: string;
  name: string;
  darkMode: boolean;
  [x: string]: any;
}

const Input = ({ label, name, darkMode, ...rest }: InputProps) => {
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
  min-height: 75px;
`;

const StyledField = styled(Field)<InputProps>`
  background-color: ${(p) => (p.darkMode ? '#ffffff22' : '#006bae32')};
  padding: 0.5em 1em;
  border-radius: 3px;
  margin-bottom: 1em;
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
