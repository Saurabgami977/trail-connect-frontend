import AxiosService from "../AxiosService";

export const createTrekkingRegion = async (data: any) => {
  const response = await AxiosService.post("/treks/regions", data, {
    withCredentials: true,
  });
  return response.data;
};

export const getTrekkingRegions = async () => {
  const response = await AxiosService.get("/treks/regions", {
    withCredentials: true,
  });
  return response.data;
};
