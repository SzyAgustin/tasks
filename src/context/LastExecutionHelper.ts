import { DocumentData, DocumentReference, getDoc, setDoc } from "firebase/firestore";
import { getLastExecution } from "../services/FirstExecutionService";
import { cleanDoneTasks } from "../services/TaskService";

export const setLastExecution = (
    lastExecutionRef: DocumentReference<DocumentData>
) => {
    setDoc(lastExecutionRef, {
        lastExecution: getTodaysDate(),
        userId: '1', //TODO, change this when authentication is developed
    })
        .then((res) => { })
        .catch((err) => {
            console.log('err', err); //TODO: agregar toaster para mostrar este error
        });
};


export const getTodaysDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

export const dailyFirstExecutionCleanUp = async () => {
    const lastExecutionRef = getLastExecution('1'); //TODO: Send userid
    const lastExecutionSnap = await getDoc(lastExecutionRef);
    if (
        lastExecutionSnap.exists() &&
        lastExecutionSnap.data().lastExecution !== getTodaysDate()
    ) {
        await cleanDoneTasks();
    }
    setLastExecution(lastExecutionRef);
};