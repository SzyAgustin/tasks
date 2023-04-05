import React, { useState } from 'react';
import Section from './components/Section';
import { ITask } from './interfaces/ITask';
import Header from './components/Header';

function App() {
  const [todayTasks, setTodayTasks] = useState<ITask[]>([
    { id: 1, title: 'Primera tarea', done: false },
    { id: 2, title: 'Segunda tarea', done: true },
  ]);

  return (
    <div>
      <Header />
      <Section title={'Tareas del día'} tasks={todayTasks} />
    </div>
  );
}

export default App;
