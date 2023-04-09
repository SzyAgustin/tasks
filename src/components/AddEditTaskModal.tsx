import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import { AppContext } from '../context/AppContext';
import { Form, Formik } from 'formik';
import Input from './form/Input';
import * as Yup from 'yup';
import styled from 'styled-components';
import Button from './Button';
import { ILocalTask, addTask } from '../services/TaskService';
import { TailSpin } from 'react-loader-spinner';
import DarkMode from './DarkMode';
import { MdDone } from 'react-icons/md';
import TransitionIcons from './TransitionIcons';

const AddEditTaskModal = () => {
  const { darkMode, isAddingTask, setIsAddingTask, setTodayTasks, todayTasks } =
    useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const timeoutClose = () => {
    setTimeout(() => {
      setLoading(false);
      setIsAddingTask(false);
      setSuccess(false);
    }, 1000);
  };

  const onSubmit = (task: ILocalTask) => {
    setLoading(true);
    addTask(task)
      .then((res) => {
        setSuccess(true);
        setTodayTasks([...todayTasks, { ...task, id: res.id }]);
      })
      .catch((err) => {
        setLoading(false);
        setSuccess(false);
      })
      .finally(() => {
        timeoutClose();
      });
  };

  const initialValues = {
    title: '',
    description: '',
    done: false,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
  });

  return (
    <Modal
      isOpen={isAddingTask}
      onRequestClose={() => setIsAddingTask(false)}
      style={customStyles(darkMode)}
    >
      <ModalBox darkMode={darkMode}>
        <TitleBox darkMode={darkMode}>Nueva tarea</TitleBox>
        <FormBox>
          <Formik
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {(formik) => (
              <Form>
                <Input name='title' label='Titulo' darkMode={darkMode} />
                <Input
                  name='description'
                  label='Descripcion'
                  darkMode={darkMode}
                />
                <FormFooter darkMode={darkMode}>
                  <CustomButton
                    type='submit'
                    fontSize='16px'
                    disabled={loading}
                    success={success}
                  >
                    {!success && !loading ? (
                      <p>Agregar</p>
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
                </FormFooter>
              </Form>
            )}
          </Formik>
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

const FormBox = styled.div`
  width: 40vw;
`;

const FormFooter = styled.div<DarkModeProps>`
  border-top: 1px solid ${(p) => (p.darkMode ? '#ffffff22' : '#006bae32')};
  padding: 20px 0;
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
    //   -webkit-box-shadow: ${(p) =>
    //     p.darkMode
    //       ? '0px 0px 9px 0px rgba(0, 0, 0, 0.85)'
    //       : '0px 0px 9px 0px #04224e'};
    //   -moz-box-shadow: ${(p) =>
    //     p.darkMode
    //       ? '0px 0px 9px 0px rgba(0, 0, 0, 0.85)'
    //       : '0px 0px 9px 0px #04224e'};
  },
  overlay: {
    background: '#00000099',
  },
});

const CustomButton = styled(Button)`
  min-width: 100px;
  min-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
