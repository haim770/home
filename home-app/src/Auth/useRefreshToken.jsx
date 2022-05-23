import instance, { axiosPrivate } from "../api/AxiosInstance";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await instance.request(
      {
        data: {
          data_type: "Refresh",
          params: {},
        },
      },
      {
        withCredentials: true,
      }
    );
    console.log(response);
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return {
        ...prev,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
