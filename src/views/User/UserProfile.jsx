import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserProfilePage from "../../components/UserProfile/UserProfile";
import { getUserProfile } from "../../services/UserServices";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getUser = useCallback(() => {
    getUserProfile(id)
      .then((user) => {
          setUser(user);
          setIsLoading(false);
      })
      .catch((error) => {
          console.error(error);
          setIsLoading(false);
      });
  }, [getUserProfile, id])

    useEffect(() => {
      getUser()
    }, [getUser]);

    if (!user) {
        return <p>User not found 🥺</p>;
      }

  return (
    <div>
      <UserProfilePage user={user} getUser={getUser}/>
    </div>
  );
};

export default UserProfile;
