import { GET, POST } from "@/constants/constant";
import { typeAxiosRequest } from "../axiosIntance";

export const getProjects = async () => {
  const getRequest = typeAxiosRequest(GET);
  try {
    const res = await getRequest({
      url: "/project",
    });
    const response = res.data;
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
