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

interface MyInputProps {
  field: any;
  form: any;
}

const MyInput = ({ field, form, ...props }: MyInputProps) => {
  const { darkMode } = useContext(AppContext);
  return <InputStyled {...field} {...form} type='text' darkMode={darkMode} />;
};

const Innput = () => {
  return <input type='text' />;
};

const Input = ({ label, name, ...rest }: InputProps) => {
  const { darkMode } = useContext(AppContext);
  return (
    <InputDiv>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledField
        id={name}
        name={name}
        darkMode={darkMode}
        component={MyInput}
        {...rest}
      ></StyledField>
      <Innput />
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
  type: 'text';
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

const InputStyled = styled.input<InputProps>`
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
`;
