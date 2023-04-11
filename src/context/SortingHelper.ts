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
    const tasksUserSortingSnap = await getTasksUserSortingSnapshot('1');
    if (tasksUserSortingSnap.exists()) {
        const sorted = tasksUserSortingSnap
            .data()
            .sortedList.map((id: string) => tasks.find((task) => task.id === id));
        return sorted.filter((task: ITask) => task !== undefined);
    }
    saveTasksSorting(tasks, userId);
    return tasks;
};