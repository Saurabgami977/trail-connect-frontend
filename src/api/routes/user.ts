import AxiosService from "../AxiosService";

export const updateUserProfile = async (data: any) => {
  const response = await AxiosService.patch(`/users/${data._id}`, data, {
    withCredentials: true,
  });
  return response.data;
};
