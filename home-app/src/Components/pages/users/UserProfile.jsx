import React , { useEffect } from 'react'
import useLogout from "../../../Auth/useLogout";
import toast, { Toaster } from "react-hot-toast"; // https://react-hot-toast.com/docs && https://react-hot-toast.com/
import useView from '../Chat/ChatUseContext';
import useAuth from '../../../Auth/useAuth';
import instance from '../../../api/AxiosInstance';


const UserProfile = () => {
  const { chatView, showContacts, chatInfo, closeWindow } = useView();
  const logout = useLogout();
  const { auth } = useAuth();

  /**
   * Get updates from server
   */
  const getNewUpdatesData = async () => {
    const result = await instance.request({
      data: {
        data_type: "getNewUpdates",
        params: {},
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });

    // check if we got new data from server or any response
    /*
                              key: anObjectMapped["msgid"],
                          msgData: anObjectMapped,
                          
    */
    if (result?.data) {
      console.log(result.data);
      if (result?.data?.chatMessages) {
        Object.values(result.data.chatMessages).map((anObjectMapped, index) => {
           toast(anObjectMapped.message, {
            icon: "👏",
            id: "userMessages",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
            position: "bottom-right",
            
          });
        });
      }
    }
  };

  const signOut = async () => {
    await logout();
  };

  /**
   * This use effect will render only once when the component loaded,
   * when we logout it will end the interval.
   * we will check for updates every 3 seconds
   */
  useEffect(() => {
      const Interval = setInterval(() => {
        getNewUpdatesData();
      }, 2000);
      return () => clearInterval(Interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <button onClick={signOut}>Sign Out</button>
      <Toaster reverseOrder={false}/>
    </div>
  );
}

export default UserProfile