import { useParams, useNavigate, Navigate } from "react-router-dom";
import { activateUser } from "../../services/AuthServices";
import { useEffect } from "react";

const ActivateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    activateUser(id)
      .then(() => {
        console.log(user)

      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, navigate]);

  return (
   <Navigate to="/login" />
  );
};

export default ActivateUser;