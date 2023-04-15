import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import { AppContext } from '../../context/AppContext';
import styled from 'styled-components';
import AddEditForm from './AddEditForm';
import Tabs from './Tabs';

const AddEditTaskModal = () => {
  const {
    darkMode,
    isAddingTask,
    setIsAddingTask,
    isEditingTask,
    setIsEditingTask,
    taskToEdit,
    setTaskToEdit,
  } = useContext(AppContext);
  const [isIndividualTask, setIsIndividualTask] = useState<boolean>(true);

  const closeModal = () => {
    setIsAddingTask(false);
    setIsEditingTask(false);
    setTaskToEdit(undefined);
  };

  return (
    <Modal
      isOpen={isAddingTask || isEditingTask}
      onRequestClose={closeModal}
      style={customStyles(darkMode)}
    >
      <ModalBox darkMode={darkMode}>
        <TitleBox darkMode={darkMode}>
          {taskToEdit ? 'Editar tarea' : 'Nueva tarea'}
        </TitleBox>
        <Tabs
          firstOption={isIndividualTask}
          setFirstOption={setIsIndividualTask}
        />
        <FormBox>
          <AddEditForm
            closeModal={closeModal}
            isIndividualTask={isIndividualTask}
          />
        </FormBox>
      </ModalBox>
    </Modal>
  );
};

export default AddEditTaskModal;

interface DarkModeProps {
  darkMode: boolean;
}

const TitleBox = styled.div<DarkModeProps>`
  border-bottom: 1px solid ${(p) => (p.darkMode ? '#ffffff22' : '#006bae32')};
  margin-bottom: 20px;
  padding-bottom: 20px;
  font-size: 30px;
`;

const ModalBox = styled.div<DarkModeProps>`
  width: 100%;
  margin: 0 auto;
  min-height: 50vh;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  color: ${(p) => (p.darkMode ? 'white' : 'rgb(4, 34, 78)')};
`;

const customStyles = (darkMode: boolean) => ({
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: darkMode ? 'rgb(4, 34, 78)' : 'white',
    border: '0',
    boxShadow: darkMode
      ? '0px 0px 5px 0px rgb(0, 0, 0)'
      : '0px 0px 5px 0px rgb(0, 0, 0, 120)',
  },
  overlay: {
    background: '#00000099',
  },
});

const FormBox = styled.div`
  width: 40vw;
`;
