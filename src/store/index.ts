import IProject from "@/interfaces/IProject";
import ITask from "@/interfaces/ITask";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import { ADD_PROJECT, EDIT_PROJECT, DELETE_PROJECT, ADD_TASK, DELETE_TASK, EDIT_TASK, NOTIFY } from "./mutations-type";
import { INotification } from "@/interfaces/INotification";

interface State {
  projects: IProject[];
  tasks: ITask[];
  notifications: INotification[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projects: [],
    tasks: [],
    notifications: [],
  },
  mutations: {
    // PROJECTS
    [ADD_PROJECT](state, projectName: string) {
      const project: IProject = {
        id: new Date().toISOString(),
        name: projectName
      };
      state.projects.push(project);
    },
    [EDIT_PROJECT](state, project: IProject) {
      const index = state.projects.findIndex((p: IProject) => p.id === project.id);
      state.projects[index] = project;
    },
    [DELETE_PROJECT](state, id: string) {
      state.projects = state.projects.filter((p: IProject) => p.id !== id);
    },
    // TASKS
    [ADD_TASK](state, task: ITask) {
      task.id = new Date().toISOString();
      state.tasks.push(task);
    },
    [EDIT_TASK](state, task: ITask) {
      const index = state.tasks.findIndex((t: ITask) => t.id === task.id);
      state.tasks[index] = task;
    },
    [DELETE_TASK](state, id: string) {
      state.tasks = state.tasks.filter((t: ITask) => t.id !== id);
    },
    // NOTIFICATIONS
    [NOTIFY](state, notification: INotification) {
      notification.id = new Date().getTime();
      state.notifications.push(notification);

      setTimeout(() => {
        state.notifications = state.notifications.filter((n: INotification) => n.id !== notification.id);
      }, 3000);
    }
  }
});

export function useStore() : Store<State> {
  return vuexUseStore(key);
}
