import { db } from "./Firebase";
import { collection, doc, query, where, writeBatch, addDoc, getDocs, deleteDoc, updateDoc } from "firebase/firestore";

export interface ILocalTask {
  title: string;
  done: boolean;
  description?: string;
  isPeriodic?: boolean;
  userId: string;
  periodicSelection?: number[];
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
  return updateDoc(taskRef, {
    title: task.title,
    description: task.description,
    done: task.done,
    isPeriodic: task.isPeriodic,
  })
}

export const cleanDoneTasks = async (userId: string) => {
  const batch = writeBatch(db);
  var doneTasksQuery = getDoneTasks(userId);
  const doneTasksSnap = await getDocs(doneTasksQuery);
  doneTasksSnap.docs.map(task => task.data().isPeriodic ?
    batch.update(getTask(task.id), { 'done': false })
    : batch.delete(getTask(task.id)))
  await batch.commit();
}