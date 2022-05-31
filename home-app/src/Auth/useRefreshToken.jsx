import instance from "../api/AxiosInstance";
import useAuth from "./useAuth";
import Cookies from "universal-cookie";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
    const cookies = new Cookies();

  const myCookie = cookies.get("refreshToken");
  if(!(myCookie === undefined)){
    const refresh = async () => {     
      const response = await instance.request(
        {
          data: {
            data_type: "Refresh",
            params: { myCookie },
          },
        },
      );
      //console.log(response);
      setAuth((prev) => {
        //console.log(JSON.stringify(prev));
        //console.log(response.data);
        return {
          ...prev,
          roles: response.data.roles,
          accessToken: response.data.accessToken,
        };
      });
      return response.data.accessToken;
    };
    return refresh;
  }
};

export default useRefreshToken;
