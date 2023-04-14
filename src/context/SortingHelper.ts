import { setDoc } from "firebase/firestore";
import { ITask } from "../services/TaskService";
import { getTasksUserSorting, getTasksUserSortingSnapshot } from "../services/SortingService";

export const saveTasksSorting = (tasks: ITask[], userId: string) => {
    const ids = tasks.map((task) => task.id);
    setDoc(getTasksUserSorting(userId), {
        sortedList: ids,
        userId,
    }).catch((err) => {
        console.log('err', err); //TODO: agregar toaster para mostrar este error
    });
};

export const sortUserTasks = async (tasks: ITask[], userId: string) => {
    const tasksUserSortingSnap = await getTasksUserSortingSnapshot(userId);
    if (!tasksUserSortingSnap.exists()) {
        saveTasksSorting(tasks, userId);
        return tasks;
    }
    const sortedIds = tasksUserSortingSnap.data().sortedList;
    const idsNotInSorted = tasks.filter(task => !sortedIds.includes(task.id)).map(task => task.id);
    const sortedTasks = sortedIds.concat(idsNotInSorted).map((id: string) => tasks.find((task) => task.id === id));
    return sortedTasks.filter((task: ITask) => task !== undefined);
};