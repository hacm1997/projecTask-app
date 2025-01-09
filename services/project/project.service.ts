import { DELETE, GET, POST, PUT } from "@/constants/constant";
import { typeAxiosRequest } from "../axiosIntance";
import { createProjectData } from "./types";

export const getProjects = async () => {
  const getRequest = typeAxiosRequest(GET);
  try {
    const res = await getRequest({
      url: "/project",
    });
    const response = res.data.data;
    return response;
  } catch (error) {
    console.error("Error to get list projects:", error);
    throw error;
  }
};

export const getProjectsByUserMember = async (collaborators: string[]) => {
  const getRequest = typeAxiosRequest(POST);
  try {
    const res = await getRequest({
      url: "/project/by-user-member",
      data: {
        collaborators,
      },
    });
    const response = res.data;
    return response;
  } catch (error) {
    console.error("Error to get list projects fot the user:", error);
    throw error;
  }
};

export const getProjectsById = async (projectId: string) => {
  const getRequest = typeAxiosRequest(GET);
  try {
    const res = await getRequest({
      url: `/project/${projectId}`,
    });
    const response = res.data;
    return response;
  } catch (error) {
    console.error("Error to get list project:", error);
    throw error;
  }
};

export const createProject = async (data: createProjectData) => {
  const getRequest = typeAxiosRequest(POST);
  try {
    const res = await getRequest({
      url: "/project",
      data,
    });
    const response = res.data;
    return response;
  } catch (error) {
    console.error("Error to create project", error);
    throw error;
  }
};

export const deleteProject = async (id: string) => {
  const getRequest = typeAxiosRequest(DELETE);
  try {
    const res = await getRequest({
      url: `/project/${id}`,
    });
    const response = res.data;
    return response;
  } catch (error) {
    console.error("Error to create project", error);
    throw error;
  }
};

export const addColab = async (data: {
  projectId: string;
  collaboratorId: string[];
}) => {
  const getRequest = typeAxiosRequest(POST);
  try {
    const res = await getRequest({
      url: "project/collaborators",
      data,
    });
    const response = res.data;
    return response;
  } catch (error) {
    console.error("Error to added collaborator", error);
    throw error;
  }
};

export const removeColab = async (projectId: string, userId: string) => {
  const getRequest = typeAxiosRequest(PUT);
  try {
    const res = await getRequest({
      url: `project/collaborators/remove/${projectId}/${userId}`,
    });
    const response = res.data;
    return response;
  } catch (error) {
    console.error("Error to remove collaborator", error);
    throw error;
  }
};
