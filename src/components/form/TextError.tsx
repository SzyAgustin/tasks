import React from 'react';
import styled from 'styled-components';

interface TextErrorProps {
  children: string;
}

const TextErrorDiv = styled.div`
  color: red;
  font-size: 12px;
`;

const TextError = ({ children }: TextErrorProps) => {
  return <TextErrorDiv>{children}</TextErrorDiv>;
};

export default TextError;
