import React, { useContext } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ITask } from '../services/TaskService';
import Task from './Task';
import { AppContext } from '../context/AppContext';

interface DragNDropListProps {
  tasksList: ITask[];
}

const DragNDropList = ({ tasksList }: DragNDropListProps) => {
  const { setTodayTasksWithSorting } = useContext(AppContext);

  const onDragEnd = (res: any) => {
    if (!res.destination) return;
    const { source, destination } = res;
    const copiedTasks = tasksList;
    const [removed] = copiedTasks.splice(source.index, 1);
    copiedTasks.splice(destination.index, 0, removed);
    setTodayTasksWithSorting(copiedTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='1'>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {tasksList.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      marginBottom: '1em',
                    }}
                  >
                    <Task key={task.id} task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragNDropList;
