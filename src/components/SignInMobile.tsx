import React from 'react';
import styled from 'styled-components';
import { FlexCenterBox } from './FlexCenterBox';
import BackgroundImg from '../images/sign-in-back.jpg';
import SignInWithGoogle from './SignInWithGoogle';

const SignInMobile = () => {
  return (
    <ImgBox>
      <ImgTop>
        <Instruction>
          <h3>Regístrate o ingresa para continuar</h3>
        </Instruction>
        <Description>
          <DescriptionTitle>
            <h1>Organízate</h1>
          </DescriptionTitle>
          <DescriptionDesc>
            <h3>y mejora tu día</h3>
          </DescriptionDesc>
        </Description>
        <ButtonsBox>
          <SignInWithGoogle />
        </ButtonsBox>
      </ImgTop>
      <Img src={BackgroundImg} />
    </ImgBox>
  );
};

export default SignInMobile;

const ImgBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ImgTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  flex-direction: column;
`;

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  filter: brightness(60%);
`;

const Instruction = styled(FlexCenterBox)`
  height: 30%;
`;

const Description = styled(FlexCenterBox)`
  height: 20%;
  flex-direction: column;
`;

const ButtonsBox = styled(FlexCenterBox)`
  height: 50%;
`;

const DescriptionTitle = styled(FlexCenterBox)`
  height: 50%;
  width: 100%;
  font-size: 25px;
  text-align: center;
`;

const DescriptionDesc = styled(FlexCenterBox)`
  height: 50%;
  width: 100%;
  font-size: 20px;
  text-align: center;
`;
