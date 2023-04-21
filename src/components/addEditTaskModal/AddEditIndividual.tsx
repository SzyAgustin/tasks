import React from 'react';
import Input from '../form/Input';
import CheckBox from '../form/CheckBox';
import PeriodicSelection from './PeriodicSelection';
import styled from 'styled-components';
import { FormikProps } from 'formik';
import { IFormTask, ITask } from '../../services/TaskService';

interface AddEditIndividualProps {
  formik: FormikProps<IFormTask>;
  taskToEdit: ITask | undefined;
  periodicSelection: number[];
  setPeriodicSelection: (x: number[]) => void;
}

const AddEditIndividual = ({
  formik,
  taskToEdit,
  periodicSelection,
  setPeriodicSelection,
}: AddEditIndividualProps) => {
  return (
    <>
      <Input name='description' label='Descripcion' />
      {taskToEdit && <CheckBox name='done' label='Completada' />}
      <CheckBox name='isPeriodic' label='Es periodica?' />
      <SpaceDiv>
        {formik.values.isPeriodic && (
          <PeriodicSelection
            periodicSelection={periodicSelection}
            setPeriodicSelection={setPeriodicSelection}
          />
        )}
      </SpaceDiv>
    </>
  );
};

export default AddEditIndividual;

const SpaceDiv = styled.div`
  height: 64px;
`;
