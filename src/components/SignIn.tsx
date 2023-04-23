import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { mediaQueryMaxWidthNum } from './constants';
import SignInDesktop from './SignInDesktop';
import SignInMobile from './SignInMobile';

const SignIn = () => {
  const [isDesktop, setDesktop] = useState(
    window.innerWidth > mediaQueryMaxWidthNum
  );

  const updateMedia = () => {
    setDesktop(window.innerWidth > mediaQueryMaxWidthNum);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });

  return (
    <SignInBox>{isDesktop ? <SignInDesktop /> : <SignInMobile />}</SignInBox>
  );
};

export default SignIn;

const SignInBox = styled.div`
  display: flex;
  height: calc(100% - 80px);
`;
