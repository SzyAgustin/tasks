import { db } from "./Firebase";
import { collection, doc, query, where, Timestamp, writeBatch, addDoc, getDocs, deleteDoc } from "firebase/firestore";
// import { IItemCart } from "../context/CartContext";

const SortingTable = "Sorting";

export const getTasksUserSorting = (userId: string) => {
    return doc(db, SortingTable, userId);
}

