import { Effect } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";

export const getAll = async (): Promise<Effect[]> => {
  return (await axiosInstance.get<Effect[]>(ApiRoutes.EFFECTS)).data;
};
