import { setDoc } from "firebase/firestore";
import { ITask } from "../services/TaskService";
import { getTasksUserSorting, getTasksUserSortingSnapshot } from "../services/SortingService";

export const saveTasksSorting = (tasks: ITask[]) => {
    const ids = tasks.map((task) => task.id);
    //todo: send user id
    setDoc(getTasksUserSorting('1'), {
        sortedList: ids,
        userId: '1', //TODO, change this when authentication is developed
    }).catch((err) => {
        console.log('err', err); //TODO: agregar toaster para mostrar este error
    });
};

export const getSortedTasks = async (tasks: ITask[]) => {
    const tasksUserSortingSnap = await getTasksUserSortingSnapshot('1');
    if (tasksUserSortingSnap.exists()) {
        const sorted = tasksUserSortingSnap
            .data()
            .sortedList.map((id: string) => tasks.find((task) => task.id === id));
        return sorted.filter((task: ITask) => task !== undefined);
    }
    saveTasksSorting(tasks);
    return tasks;
};