import React, { useContext } from 'react';
import { MdDone } from 'react-icons/md';
import { TailSpin } from 'react-loader-spinner';
import TransitionIcons from './TransitionIcons';
import { AppContext } from '../context/AppContext';
import Button from './Button';
import styled from 'styled-components';

interface ModalButtonProps {
  loading: boolean;
  success: boolean;
  isDeletion?: boolean;
  onClick?: () => void;
}

const ModalButton = ({
  loading,
  success,
  isDeletion,
  onClick,
}: ModalButtonProps) => {
  const { taskToEdit } = useContext(AppContext);

  const getButtonText = () => {
    if (isDeletion) return 'Eliminar';
    return taskToEdit ? 'Editar' : 'Agregar';
  };

  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <CustomButton
      type={isDeletion ? 'button' : 'submit'}
      fontSize='16px'
      disabled={loading}
      success={success}
      color={!!isDeletion ? '#ec1a1a' : undefined}
      marginLeft={isDeletion ? '10px' : undefined}
      onClick={handleClick}
    >
      {!success && !loading ? (
        <p>{getButtonText()}</p>
      ) : (
        <TransitionIcons
          showFirst={success}
          first={<MdDone />}
          second={
            <TailSpin
              height='18.5'
              width='18.5'
              color='#ffffff'
              ariaLabel='tail-spin-loading'
              radius='1'
              wrapperStyle={{}}
              wrapperClass=''
              visible={true}
            />
          }
        />
      )}
    </CustomButton>
  );
};

export default ModalButton;

const CustomButton = styled(Button)`
  min-width: 100px;
  min-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
