// const producto1 = { id: 1, title: 'Bicicleta con Rueditas Azul Nueva', pictureUrl: 'https://picsum.photos/200/300', description: 'my prod 1', price: 110, stock: 5, category: 'vehiculo' }
// const producto2 = { id: 2, title: 'PlayStation 5 con cuatro juegos a eleccion', pictureUrl: 'https://picsum.photos/210/300', description: 'my prod 2', price: 120, stock: 10, category: 'electronica' }
// const producto3 = { id: 3, title: 'XBox con 2 joystiks originales', pictureUrl: 'https://picsum.photos/220/300', description: 'my prod 3', price: 130, stock: 2, category: 'electronica' }
// const producto4 = { id: 4, title: 'Moto 10000km Azul Nueva', pictureUrl: 'https://picsum.photos/230/300', description: 'my prod 4', price: 140, stock: 20, category: 'vehiculo' }
// const producto5 = { id: 5, title: 'XBox imperdible', pictureUrl: 'https://picsum.photos/240/300', description: 'my prod 5', price: 150, stock: 40, category: 'electronica' }
// const producto6 = { id: 6, title: 'Como ganar amigos e influir en las personas', pictureUrl: 'https://picsum.photos/250/300', description: 'my prod 6', price: 160, stock: 25, category: 'libro' }
// const producto7 = { id: 7, title: 'Bicicleta Mountain Bike Roja', pictureUrl: 'https://picsum.photos/260/300', description: 'my prod 7', price: 170, stock: 22, category: 'vehiculo' }
// const producto8 = { id: 8, title: 'XBox imperdible', pictureUrl: 'https://picsum.photos/270/300', description: 'my prod 8', price: 180, stock: 3, category: 'electronica' }
// const producto9 = { id: 9, title: 'Padre rico padre pobre', pictureUrl: 'https://picsum.photos/280/300', description: 'my prod 9', price: 180, stock: 3, category: 'libro' }

// const arr = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9];

import { db } from "./Firebase";
import { collection, doc, query, where, Timestamp, writeBatch, addDoc, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
// import { IItemCart } from "../context/CartContext";


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
  // return category ? query(collection(db, "tasks"), where("category", "==", category), where("stock", "!=", 0)) : query(collection(db, "ItemList"), where("stock", "!=", 0));
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