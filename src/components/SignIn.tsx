import React, { useContext } from 'react';
import styled from 'styled-components';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { authentication } from './../services/Firebase';
import Button from './Button';
import { UserContext } from '../context/UserContext';
import { AppContext } from '../context/AppContext';
import { FcGoogle } from 'react-icons/fc';

const SignIn = () => {
  const { setUser } = useContext(UserContext);
  const { darkMode } = useContext(AppContext);
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(authentication, provider)
      .then((res) => {
        setUser({
          displayName: res.user.displayName,
          email: res.user.email,
          uid: res.user.uid,
        });
        localStorage.setItem(
          'tasks-user',
          `${res.user.displayName};${res.user.email};${res.user.uid}`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SignInContainer darkMode={darkMode}>
      <TitleContainer darkMode={darkMode}>Sign In</TitleContainer>
      <ButtonsDiv>
        <Button
          onClick={signInWithGoogle}
          fontSize='18px'
          padding='8px 25px'
          color='#c93528'
        >
          <FcGoogleContainer>
            <FcGoogle />
          </FcGoogleContainer>{' '}
          <ButtonText>Sign in with Google</ButtonText>
        </Button>
      </ButtonsDiv>
    </SignInContainer>
  );
};

export default SignIn;

interface DarkModeProp {
  darkMode: boolean;
}

const SignInContainer = styled.div<DarkModeProp>`
  width: 80%;
  margin: 0 auto;
  min-height: 50vh;
  padding: 50px;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 0 0px 5px 0px rgba(0, 0, 0, 0.2);
  background-color: ${(p) => (p.darkMode ? 'rgb(45, 88, 151)' : 'white')};
  color: ${(p) => (p.darkMode ? 'white' : 'rgb(4, 34, 78)')};
`;

const ButtonsDiv = styled.div`
  width: 100%;
  min-height: 24vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleContainer = styled.div<DarkModeProp>`
  height: 60px;
  border-bottom: 1px solid #c9c9c9;
  margin-bottom: 20px;
  font-size: 30px;
  color: #444444;
  color: ${(p) => (p.darkMode ? 'white' : 'rgb(4, 34, 78)')};
`;

const FcGoogleContainer = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 30px;
`;

const ButtonText = styled.p`
  margin-left: 15px;
`;
