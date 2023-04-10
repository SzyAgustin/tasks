import React, { PropsWithChildren } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ITask } from '../services/TaskService';
import Task from './Task';

interface DragNDropListProps {
  tasksList: ITask[];
}

const DragNDropList = ({ tasksList }: DragNDropListProps) => {
  return (
    <DragDropContext
      onDragEnd={(res) => {
        console.log(res);
      }}
    >
      <Droppable droppableId='1'>
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {tasksList.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    // style={provided.draggableProps.style}
                  >
                    <Task key={task.id} task={task} />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragNDropList;
