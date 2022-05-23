import instance from "../api/AxiosInstance";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      const response = await instance.request(
        {
          data: {
            data_type: "Logout",
            params: {},
          },
        },
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
