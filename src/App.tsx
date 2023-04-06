import React, { useEffect, useState } from 'react';
import Section from './components/Section';
import Header from './components/Header';
import { ITask, getTasks } from './services/TaskService';
import { getDocs } from 'firebase/firestore';

function App() {
  const [todayTasks, setTodayTasks] = useState<ITask[]>([]);
  const [loadingTasks, setLoadingTasks] = useState<boolean>(false);

  useEffect(() => {
    setLoadingTasks(true);
    const query = getTasks();
    getDocs(query).then((querySnapshot) => {
      setTodayTasks(
        querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() } as ITask;
        })
      );
      setLoadingTasks(false);
    });
  }, []);

  return (
    <>
      <Header />
      <Section
        title={'Tareas del día'}
        tasks={todayTasks}
        loadingTasks={loadingTasks}
        setTodayTasks={setTodayTasks}
      />
    </>
  );
}

export default App;
