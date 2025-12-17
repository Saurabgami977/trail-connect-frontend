import AxiosService from "../AxiosService";

export const createTrekkingRegion = async (data: any) => {
  const response = await AxiosService.post("/treks/regions", data, {
    withCredentials: true,
  });
  return response.data;
};
