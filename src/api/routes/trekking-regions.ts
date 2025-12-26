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

export const getTrekkingRegionById = async (id: string) => {
  const response = await AxiosService.get(`/treks/regions/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const updateTrekkingRegion = async (id: string, data: any) => {
  const response = await AxiosService.put(`/treks/regions/${id}`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteTrekkingRegion = async (id: string) => {
  const response = await AxiosService.delete(`/treks/regions/${id}`, {
    withCredentials: true,
  });
  return response.data;
};
