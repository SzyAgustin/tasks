import { db } from "./Firebase";
import { doc, getDoc } from "firebase/firestore";

const SortingTable = "Sorting";

export const getTasksUserSorting = (userId: string) => {
    return doc(db, SortingTable, userId);
}

export const getTasksUserSortingSnapshot = async (userId: string) => {
    const getTasksUserSortingRef = getTasksUserSorting(userId);
    return await getDoc(getTasksUserSortingRef);
}

