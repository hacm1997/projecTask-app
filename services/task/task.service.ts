import { GET, POST, PUT } from "@/constants/constant";
import { typeAxiosRequest } from "../axiosIntance";
import { TaskFormModel } from "@/components/utils/types";

export const getTaskByProjectId = async (projectId: string, title?: string) => {
  const getRequest = typeAxiosRequest(GET);
  try {
    const res = await getRequest({
      url: `/task/${projectId}?title=${title ?? undefined}`,
    });
    const response = res.data;
    return response;
  } catch (error) {
    console.error("Error to get tasks:", error);
    throw error;
  }
};

export const getTaskById = async (taskId: string) => {
  const getRequest = typeAxiosRequest(GET);
  try {
    const res = await getRequest({
      url: `/task/by-id/${taskId}`,
    });
    const response = res.data;
    return response;
  } catch (error) {
    console.error("Error to get task:", error);
    throw error;
  }
};

export const addTask = async (projectId: string, data: TaskFormModel) => {
  const getRequest = typeAxiosRequest(POST);
  try {
    const res = await getRequest({
      url: `project/tasks/${projectId}`,
      data,
    });
    const response = res.data;
    return response;
  } catch (error) {
    console.error("Error to add task:", error);
    throw error;
  }
};

export const removeTask = async (projectId: string, taskId: string) => {
  const getRequest = typeAxiosRequest(PUT);
  try {
    const res = await getRequest({
      url: `project/tasks/remove/${projectId}/${taskId}`,
    });
    const response = res.data;
    return response;
  } catch (error) {
    console.error("Error to get tasks:", error);
    throw error;
  }
};

export const updateTask = async (taskId: string, data: TaskFormModel) => {
  const getRequest = typeAxiosRequest(PUT);
  try {
    const res = await getRequest({
      url: `/task/${taskId}`,
      data,
    });
    const response = res.data;
    return response;
  } catch (error) {
    console.error("Error to update tasks:", error);
    throw error;
  }
};
