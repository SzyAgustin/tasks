import React from 'react';
import styled from 'styled-components';
import { FlexCenterBox } from './FlexCenterBox';
import SignInWithGoogle from './SignInWithGoogle';
import BackgroundImg from '../images/sign-in-back.jpg';

const SignInDesktop = () => {
  return (
    <>
      <ImgBox>
        <ImgTop>
          <ImgTopContent>
            <ImgTopContentTitle>
              <h1>Organízate</h1>
            </ImgTopContentTitle>
            <ImgTopContentDesc>
              <h3>y mejora tu día</h3>
            </ImgTopContentDesc>
          </ImgTopContent>
        </ImgTop>
        <Img src={BackgroundImg} />
      </ImgBox>
      <RightBox>
        <TitleBox>
          <h1>Regístrate o ingresa para continuar</h1>
        </TitleBox>
        <ButtonsBox>
          <SignInWithGoogle />
        </ButtonsBox>
      </RightBox>
    </>
  );
};

export default SignInDesktop;

const ImgBox = styled.div`
  position: relative;
  width: 40%;
  height: 100%;
  overflow: hidden;
`;

const ImgTop = styled(FlexCenterBox)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
`;

const ImgTopContent = styled(FlexCenterBox)`
  flex-direction: column;
  width: 50%;
  height: 25%;
  margin-bottom: 100px;
`;

const ImgTopContentTitle = styled(FlexCenterBox)`
  height: 50%;
  width: 100%;
  font-size: 35px;
  text-align: center;
`;

const ImgTopContentDesc = styled(FlexCenterBox)`
  height: 50%;
  width: 100%;
  font-size: 20px;
  text-align: center;
`;

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  filter: brightness(60%);
`;

const RightBox = styled.div`
  width: 60%;
  height: 100%;
  /* background: blue; */
`;

const TitleBox = styled(FlexCenterBox)`
  height: 35%;
  text-align: center;
`;

const ButtonsBox = styled(FlexCenterBox)`
  height: 25%;
`;
