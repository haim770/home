import React from 'react'
import useLogout from "../../../Auth/useLogout";
const UserProfile = () => {
      const logout = useLogout();

      const signOut = async () => {
        await logout();
      };

  return (
    <div>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default UserProfile