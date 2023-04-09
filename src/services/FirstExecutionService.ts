import { db } from "./Firebase";
import { collection, doc, query, where, Timestamp, writeBatch, addDoc } from "firebase/firestore";
// import { IItemCart } from "../context/CartContext";

const lastExcecutionTable = "LastExecution";

// export const getLastExecution = (userId: string) => {
//     return query(collection(db, lastExcecutionTable), where("userId", "==", userId));
// }

export const getLastExecution = (userId: string) => {
    return doc(db, lastExcecutionTable, userId);
}

