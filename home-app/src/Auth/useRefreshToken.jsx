import instance from "../api/AxiosInstance";
import useAuth from "./useAuth";
import Cookies from "universal-cookie";
import useDH from "./DH/DHUseContext";

const useRefreshToken = () => {
  //console.log("refresh_token_called");
  const { setAuth } = useAuth();
  const { generateAlicePKA, generateSharedKey, alicePKA } = useDH();
  const cookies = new Cookies();

  const myCookie = cookies.get("refreshToken");
  if(!(myCookie === undefined)){
    const refresh = async () => {    
      generateAlicePKA(); 
      const response = await instance.request({
        data: {
          data_type: "Refresh",
          params: { myCookie, alicePKA },
        },
      });
      //console.log(response);
        const bobPKA = response?.data?.publicKey;
        generateSharedKey(bobPKA);
      setAuth((prev) => {
        //console.log(JSON.stringify(prev));
        //console.log(response.data);
        return {
          ...prev,
          user: response.data.user,
          roles: response.data.roles,
          accessToken: response.data.accessToken,
          firstName: response?.data?.firstName,
          lastName: response?.data?.lastName,
        };
      });
      return response.data.accessToken;
    };
    return refresh;
  }
};

export default useRefreshToken;
