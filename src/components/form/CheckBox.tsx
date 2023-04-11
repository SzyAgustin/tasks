import React, { useContext } from 'react';
import { Field, ErrorMessage, FieldProps } from 'formik';
import TextError from './TextError';
import styled from 'styled-components';
import { AppContext } from '../../context/AppContext';
import Switch from 'react-switch';

interface CheckBoxProps {
  label: string;
  name: string;
  [x: string]: any;
}

const CheckBox = ({ label, name, ...rest }: CheckBoxProps) => {
  const { darkMode } = useContext(AppContext);
  return (
    <CheckBoxDiv>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <Field
        type='checkbox'
        id={name}
        name={name}
        darkMode={darkMode}
        {...rest}
      >
        {({ field, form }: FieldProps) => (
          <Switch
            {...field}
            onChange={(val) => form.setFieldValue(name, val)}
            checked={field.value}
            onColor='#00d75d'
          />
        )}
      </Field>
      <ErrorMessage name={name}>
        {(error) => <TextError>{error}</TextError>}
      </ErrorMessage>
    </CheckBoxDiv>
  );
};

export default CheckBox;

const CheckBoxDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  min-height: 75px;
`;

const StyledLabel = styled.label`
  margin-bottom: 2px;
  font-size: 12px;
`;
