import React, { useContext } from 'react';
import Button from './Button';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { authentication } from './../services/Firebase';
import { UserContext } from '../context/UserContext';

const SignInWithGoogle = () => {
  const { setUser } = useContext(UserContext);
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
        console.log(err); //Todo: toaster para este error
      });
  };
  return (
    <Button
      onClick={signInWithGoogle}
      fontSize='18px'
      padding='8px 25px'
      color='#c93528'
    >
      <FcGoogleContainer>
        <FcGoogle />
      </FcGoogleContainer>{' '}
      <ButtonText>Continuar con Google</ButtonText>
    </Button>
  );
};

export default SignInWithGoogle;

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
