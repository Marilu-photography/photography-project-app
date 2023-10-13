import { useParams, useNavigate } from "react-router-dom";
import { activateUser } from "../../services/AuthServices";
import { useEffect, useState } from "react";

const ActivateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activationMessage, setActivationMessage] = useState(null);

  useEffect(() => {
    activateUser(id)
      .then((response) => {
        setActivationMessage(response.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Redirige al usuario después de 2 segundos
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, navigate]);

  return (
    <div>
      {activationMessage ? (
        <p>{activationMessage}</p>
      ) : (
        <p>Activating user...</p>
      )}
    </div>
  );
};

export default ActivateUser;