import "./EditProfile.css";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { userSchema } from "../../utils/user.schema.js";
import { editUser, getUserProfile } from "../../services/UserServices";
import InputGroup from "../../components/InputGroup/InputGroup";
import { useNavigate, useParams } from "react-router-dom";


const EditProfile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  
  const [isEditing, setIsEditing] = useState(false);
  
  const handleNavigation = () => {
    navigate(`/profile/${userId}`);
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isSubmitting,
    handleSubmit,
    setSubmitting,
    setFieldValue,
  } = useFormik({
    initialValues: {
      username: "",
      name: "",
      surname: "",
      email: "",
      avatar: "", 
    },
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: userSchema,
    onSubmit: (values) => {
        // Crear un objeto FormData y agregar todos los campos
        const formData = new FormData();
        formData.append("username", values.username);
        formData.append("name", values.name);
        formData.append("surname", values.surname);
        formData.append("email", values.email);
        formData.append("avatar", values.avatar);
        
         // Antes de enviar la solicitud, imprime los datos en la consola
    console.log("Data to be sent:", formData);

    console.log("Calling editUser function");
    
    // Imprime el usuario ID para asegurarte de que es correcto
    console.log("User ID:", userId);

    // Imprime el usuario objeto para asegurarte de que contiene la información correcta
    console.log("User Object:", values);

        editUser(userId, formData) // Envía formData en lugar de values
          .then((response) => {
            console.log("Response from editUser:", response);
  
            if (response) {
              handleNavigation();
            } else {
              console.error("Response or response.data is undefined");
            }
          })
          .catch((error) => {
            console.error("Error in editUser:", error);
          })
          .finally(() => {
            setSubmitting(false);
          });
      },
  });

  useEffect(() => {
    if (userId) {
      setIsEditing(true);

      // Obtener perfil del usuario
      getUserProfile(userId)
        .then((response) => {
          console.log("getUserProfile Response:", response);

          if (response) {
            const { username, name, surname, email, avatar } = response;
            setFieldValue("username", username);
            setFieldValue("name", name);
            setFieldValue("surname", surname);
            setFieldValue("email", email);
            setFieldValue("avatar", avatar);
          } else {
            console.error("La respuesta o response.data está indefinida");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userId, setFieldValue, setIsEditing]);

  return (
    <div className="edit-profile-container">
      <h1> { isEditing  ? "Edit User" : "no edit" }</h1>
      <div className="edit-user">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <InputGroup
            label="Username"
            name="username"
            type="text"
            placeholder="Enter username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.username && errors.username}
          />
          <InputGroup
            label="Name"
            name="name"
            type="text"
            placeholder="Enter name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && errors.name}
          />
          <InputGroup
            label="Surname"
            name="surname"
            type="text"
            placeholder="Enter surname"
            value={values.surname}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.surname && errors.surname}
          />
          <InputGroup
            label="Email"
            name="email"
            type="email"
            placeholder="Enter email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email}
          />
          <InputGroup
            label="Avatar"
            name="avatar"
            type="file"
            onChange={(e) => {
              setFieldValue("avatar", e.currentTarget.files[0]);
            }}
            onBlur={handleBlur}
            error={touched.avatar && errors.avatar}
          />
        <button  type="submit" className={` btn-${isSubmitting ? 'secondary' : 'btn-edit-profile'}`} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "update"}
            </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
