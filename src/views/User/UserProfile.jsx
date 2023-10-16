import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../../services/UserServices";
import { getProductList } from "../../services/ProductsServices";
import UserProfilePage from "../../components/UserProfile/UserProfile";
import AdminProfile from "../../components/UserProfile/AdminProfile";


const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

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

  useEffect(() => {
    getProductList()
      .then((products) => {
        setProducts(products);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  if (!user) {
    return <p>User not found 🥺</p>;
  }

  return (
    <>
      {user && user.isAdmin === false ? (
        <div>
          <UserProfilePage user={user} getUser={getUser} />
        </div>
      ) : 
      
      <AdminProfile user={user} products={products} />}</>

  );
};

export default UserProfile;