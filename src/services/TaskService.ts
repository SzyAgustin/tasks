import { db } from "./Firebase";
import { collection, doc, query, where, writeBatch, addDoc, getDocs, deleteDoc, updateDoc } from "firebase/firestore";

export interface ILocalTask {
  title: string;
  done: boolean;
  description?: string;
  isPeriodic?: boolean;
}

export interface ITask extends ILocalTask {
  id: string;
}

const TaskList = "Task";

export const getTasks = () => {
  return query(collection(db, TaskList)); //TODO: add where clause for userID when it is done
}

export const getDoneTasks = () => {
  return query(collection(db, TaskList), where("done", "==", true)); //TODO: add where clause for userID when it is done
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

export const cleanDoneTasks = async () => {
  const batch = writeBatch(db);
  var doneTasksQuery = getDoneTasks();
  const doneTasksSnap = await getDocs(doneTasksQuery);
  doneTasksSnap.docs.map(task => task.data().isPeriodic ?
    batch.update(getTask(task.id), { 'done': false })
    : batch.delete(getTask(task.id)))
  await batch.commit();
}