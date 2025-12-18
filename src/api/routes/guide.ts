import AxiosService from "../AxiosService";

export const getAll = async () => {
  const response = await AxiosService.get("/guides", {
    withCredentials: true,
  });
  return response.data;
};

export const getVerified = async () => {
  const response = await AxiosService.get("/guides/verified", {
    withCredentials: true,
  });
  return response.data;
};

export const getUnverified = async () => {
  const response = await AxiosService.get("/guides/unverified", {
    withCredentials: true,
  });
  return response.data;
};

export const getRejected = async () => {
  const response = await AxiosService.get("/guides/rejected", {
    withCredentials: true,
  });
  return response.data;
};

// search/by-region
export const searchByRegion = async (region: string) => {
  const response = await AxiosService.get(`/guides/search/by-region`, {
    params: { region },
    withCredentials: true,
  });
  return response.data;
};

export const getById = async (id: string) => {
  const response = await AxiosService.get(`/guides/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

// user/:userId
export const getByUserId = async (userId: string) => {
  const response = await AxiosService.get(`/guides/user/${userId}`, {
    withCredentials: true,
  });
  return response.data;
};

// Patch with id
export const updateGuide = async (id: string, data: any) => {
  const response = await AxiosService.patch(`/guides/${id}`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const verifyGuide = async (id: string) => {
  const response = await AxiosService.post(
    `/guides/${id}/verify`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const rejectGuide = async (id: string, reason: string) => {
  const response = await AxiosService.post(
    `/guides/${id}/reject`,
    { reason },
    {
      withCredentials: true,
    }
  );
  return response.data;
};
