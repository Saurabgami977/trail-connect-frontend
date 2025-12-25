import AxiosService from "../AxiosService";

export const createTrekTemplate = async (data: any) => {
  const response = await AxiosService.post("/treks/templates", data, {
    withCredentials: true,
  });
  return response.data;
};
