import React from 'react'
import {
  useSearchParams,
  useLocation,
  Navigate,
} from "react-router-dom";
import instance from '../../../api/AxiosInstance';

const RecoveryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const token = searchParams.get("token");
  const userMail = searchParams.get("email");
  let errMessage = false;

  /**
   * Get Chat from server
   */
  const testCredentials = async () => {
    const result = await instance.request({
      data: {
        data_type: "testRecoveryParams",
        params: { token: token, email: userMail },
      },
    });

    // check if we got new data from server or any response
    if (result?.data) {
      errMessage = result?.data.isValid == "true" ? true: false;
    }
  };


  return token && userMail && errMessage ? (
    <div>
      RecoveryPage
      <p>This is the test page.</p>
      {token && <p>Token: {token}</p>}
      {userMail && <p>Email: {userMail}</p>}
      {errMessage}
    </div>
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
}

export default RecoveryPage