import { DELETE, GET, POST } from "@/constants/constant";
import { typeAxiosRequest } from "../axiosIntance";

export const getComments = async (taskId: string) => {
  const getRequest = typeAxiosRequest(GET);
  try {
    if (taskId !== "") {
      const res = await getRequest({
        url: `/comment/${taskId}`,
      });
      const response = res.data;
      return response;
    }
  } catch (error) {
    console.error("comments not found:", error);
  }
};

export const createComment = async (taskId: string, content: string) => {
  const getRequest = typeAxiosRequest(POST);
  const data = {
    content,
  };
  try {
    if (taskId !== "") {
      const res = await getRequest({
        url: `/comment/${taskId}`,
        data,
      });
      const response = res.data;
      return response;
    }
  } catch (error) {
    console.error("Error to save comment:", error);
  }
};

export const deleteComment = async (id: string) => {
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
