import { db } from "./Firebase";
import { collection, doc, query, where, writeBatch, addDoc, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import SubTask from '../components/SubTask';

export interface ILocalTask {
  title: string;
  done: boolean;
  description?: string;
  isPeriodic?: boolean;
  userId: string;
  periodicSelection?: number[];
  subTasks: ISubTask[];
}

export interface IFormTask extends ILocalTask {
  subTask: string;
}

export interface ISubTask {
  id: string;
  title: string;
  done: boolean;
}

export interface ITask extends ILocalTask {
  id: string;
}

const TaskList = "Task";

export const getTasks = (userId: string) => {
  return query(collection(db, TaskList), where("userId", "==", userId));
}

export const getAllTasks = async (userId: string) => {
  const allTasksSnapshot = await getDocs(getTasks(userId));
  const allTasks = allTasksSnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as ITask)
  );
  return allTasks;
}

export const getJustTodayTasks = async (userId: string) => {
  const allTasks = await getAllTasks(userId);
  const today = new Date().getDay();
  return allTasks.filter(
    (task) =>
      !task.isPeriodic ||
      !task.periodicSelection ||
      task.periodicSelection.length === 0 ||
      task.periodicSelection.includes(today)
  )

}

export const getDoneTasks = (userId: string) => {
  return query(collection(db, TaskList), where("done", "==", true), where("userId", "==", userId));
}

export const getDoneSubTasks = (userId: string) => {
  return query(collection(db, TaskList), where("userId", "==", userId), where("subTasks.done", "!=", true));
}

export const getTaskList = () => {
  return collection(db, TaskList);
}

export const addTask = (task: ILocalTask) => {
  const taskList = getTaskList();
  return addDoc(taskList, task);
}

export const getTask = (taskId: string) => {
  return doc(db, TaskList, taskId);
}

export const deleteTask = (taskId: string) => {
  return deleteDoc(getTask(taskId));
}

export const editTask = (taskId: string, task: ILocalTask) => {
  const taskRef = getTask(taskId);
  return updateDoc(taskRef, { ...task })
}

export const cleanDoneTasks = async (userId: string) => {
  const batch = writeBatch(db);
  const allTasksSnapshot = await getDocs(getTasks(userId));
  allTasksSnapshot.docs.forEach(task => {
    const taskData = task.data();
    if (taskData.done) {
      taskData.isPeriodic ?
        batch.update(getTask(task.id), { 'done': false })
        : batch.delete(getTask(task.id))
    }
    if (taskData.subTasks.length > 0 && taskData.subTasks.every((st: ISubTask) => st.done)) {
      batch.delete(getTask(task.id))
    }
  })
  await batch.commit();
}