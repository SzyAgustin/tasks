import React from 'react';
import styled from 'styled-components';

interface PeriodicSelectionProps {
  periodicSelection: number[];
  setPeriodicSelection: (x: number[]) => void;
}

const PeriodicSelection = ({
  periodicSelection,
  setPeriodicSelection,
}: PeriodicSelectionProps) => {
  const isDaySelected = (dayId: number) => {
    return periodicSelection.length === 0 || periodicSelection.includes(dayId);
  };

  const selectDay = (dayId: number) => {
    if (dayId === 7) {
      setPeriodicSelection([]);
      return;
    }
    if (periodicSelection.length === 0) {
      setPeriodicSelection([dayId]);
      return;
    }
    if (periodicSelection?.includes(dayId)) {
      setPeriodicSelection(periodicSelection.filter((day) => day !== dayId));
    } else {
      const days = [...periodicSelection, dayId];
      setPeriodicSelection(days.length === 7 ? [] : days);
    }
  };

  return (
    <PeriodicSelectionBox>
      <DayCheckBoxAll
        isSelected={periodicSelection.length === 0}
        onClick={() => selectDay(7)}
      >
        Todos
      </DayCheckBoxAll>
      <DayCheckBox isSelected={isDaySelected(1)} onClick={() => selectDay(1)}>
        Lun
      </DayCheckBox>
      <DayCheckBox isSelected={isDaySelected(2)} onClick={() => selectDay(2)}>
        Mar
      </DayCheckBox>
      <DayCheckBox isSelected={isDaySelected(3)} onClick={() => selectDay(3)}>
        Mie
      </DayCheckBox>
      <DayCheckBox isSelected={isDaySelected(4)} onClick={() => selectDay(4)}>
        Jue
      </DayCheckBox>
      <DayCheckBox isSelected={isDaySelected(5)} onClick={() => selectDay(5)}>
        Vie
      </DayCheckBox>
      <DayCheckBox isSelected={isDaySelected(6)} onClick={() => selectDay(6)}>
        Sab
      </DayCheckBox>
      <DayCheckBox isSelected={isDaySelected(0)} onClick={() => selectDay(0)}>
        Dom
      </DayCheckBox>
    </PeriodicSelectionBox>
  );
};

export default PeriodicSelection;

const PeriodicSelectionBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

interface DayCheckBoxProps {
  isSelected: boolean;
}

const DayCheckBox = styled.div<DayCheckBoxProps>`
  transition: 0.2s;
  padding: 6.5px 10px;
  margin-right: 6px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  background-color: ${(p) => (p.isSelected ? '#00d75d' : 'gray')};
  cursor: pointer;
  color: white;
`;

const DayCheckBoxAll = styled(DayCheckBox)`
  margin-right: 16px;
`;
