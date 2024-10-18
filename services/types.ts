import { Type } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";

export const getAll = async (): Promise<Type[]> => {
  return (await axiosInstance.get<Type[]>(ApiRoutes.TYPES)).data;
};
