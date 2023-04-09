import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  color?: string;
  fontSize?: string;
  success?: boolean;
  margin?: string;
  marginLeft?: string;
  marginRight?: string;
}

const Button = styled.button<ButtonProps>`
  transition: 0.4s;
  border: 0px;
  ${(p) => p.fontSize && `font-size: ${p.fontSize};`}
  padding: 6px 10px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(p) => p.margin && `margin: ${p.margin};`}
  ${(p) => p.marginLeft && `margin-left: ${p.marginLeft};`}
  ${(p) => p.marginRight && `margin-right: ${p.marginRight};`}
  background-color: ${(p) =>
    p.success
      ? '#3eb928'
      : p.disabled
      ? 'gray'
      : p.color
      ? p.color
      : '#2862b9'};
  color: white;
  cursor: pointer;

  &:hover {
    background-color: ${(p) =>
      p.success
        ? '#3eb928ce'
        : p.disabled
        ? 'gray'
        : p.color
        ? `${p.color}ce`
        : '#2862b9de'};
  }
`;

export default Button;
