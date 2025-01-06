import axios from "axios";
/**
 * @description axios instance for GET requests
 * @example
 * getTypeRequestCampaigns({
 *  url: '/path/to/api'
 * })
 */
export const typeAxiosRequest = (method: string) => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVICE_URL as string,
    method: method,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
