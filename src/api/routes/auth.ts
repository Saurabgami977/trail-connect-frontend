import AxiosService from "../AxiosService";

export const signup = async (data: any) => {
  const response = await AxiosService.post("/auth/register", data, {
    withCredentials: true,
  });
  return response.data;
};

export const signin = async (data: any) => {
  const response = await AxiosService.post("/auth/login", data, {
    withCredentials: true,
  });
  return response.data;
};

export const signout = async () => {
  const response = await AxiosService.post(
    "/auth/logout",
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const sendOtp = async (data: any) => {
  const response = await AxiosService.post("/auth/send-otp", data, {
    withCredentials: true,
  });
  return response.data;
};

export const fetchCurrentUser = async () => {
  const response = await AxiosService.get("/auth/profile", {
    withCredentials: true,
  });
  return response.data;
};
