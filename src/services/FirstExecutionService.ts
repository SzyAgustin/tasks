import { db } from "./Firebase";
import { doc, getDoc } from "firebase/firestore";

const lastExcecutionTable = "LastExecution";

export const getLastExecution = (userId: string) => {
    return doc(db, lastExcecutionTable, userId);
}

export const getLastExecutionSnapshot = async (userId: string) => {
    const lastExecutionRef = getLastExecution(userId);
    return await getDoc(lastExecutionRef);
} 
