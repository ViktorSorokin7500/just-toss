import { Terpene } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";

export const getAll = async (): Promise<Terpene[]> => {
  return (await axiosInstance.get<Terpene[]>(ApiRoutes.TERPENES)).data;
};
