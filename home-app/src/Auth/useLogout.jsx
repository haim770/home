import instance from "../api/AxiosInstance";
import useAuth from "./useAuth";
import Cookies from "universal-cookie";

const useLogout = () => {
  const { setAuth } = useAuth();
  const cookies = new Cookies();

  const logout = async () => {
    cookies.remove("refreshToken");
    setAuth({});
    try {
      const response = await instance.request(
        {
          data: {
            data_type: "Logout",
            params: {},
          },
        },
      );
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
