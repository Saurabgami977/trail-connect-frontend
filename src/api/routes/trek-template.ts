import AxiosService from "../AxiosService";

export const createTrekTemplate = async (data: any) => {
  const response = await AxiosService.post("/treks/templates", data, {
    withCredentials: true,
  });
  return response.data;
};

export const getTrekTemplates = async () => {
  const response = await AxiosService.get("/treks/templates", {
    withCredentials: true,
  });
  return response.data;
};

export const getTrekTemplateById = async (id: string) => {
  const response = await AxiosService.get(`/treks/templates/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const updateTrekTemplate = async (id: string, data: any) => {
  const response = await AxiosService.patch(`/treks/templates/${id}`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteTrekTemplate = async (id: string) => {
  const response = await AxiosService.delete(`/treks/templates/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const getTemplateBySlug = async (slug: string) => {
  const response = await AxiosService.get(`/treks/templates/slug/${slug}`, {
    withCredentials: true,
  });
  return response.data;
};
