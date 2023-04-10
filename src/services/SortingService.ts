import { db } from "./Firebase";
import { collection, doc, query, where, Timestamp, writeBatch, addDoc, getDocs, deleteDoc, getDoc } from "firebase/firestore";
// import { IItemCart } from "../context/CartContext";

const SortingTable = "Sorting";

export const getTasksUserSorting = (userId: string) => {
    return doc(db, SortingTable, userId);
}

export const getTasksUserSortingSnapshot = async (userId: string) => {
    const getTasksUserSortingRef = getTasksUserSorting(userId);
    return await getDoc(getTasksUserSortingRef);
}

