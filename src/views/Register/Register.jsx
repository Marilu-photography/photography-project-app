import InputGroup from "../../components/InputGroup/InputGroup";
import { useFormik } from "formik";
import { registerSchema } from '../../utils/yup.schemas';
import { register } from '../../services/AuthServices';
import { Link, Navigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import './Register.css'

// import ModalMessage from "../../components/Modal/ModalMessage";
// import { useState } from "react";

const initialValues = {
  name: "",
  surname: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = ( { onCloseModalR  }) => {
  const { user } = useAuthContext();
  // const [showHelloWorldModal, setShowHelloWorldModal] = useState(false);
  //const navigate = useNavigate();
  //const [modalShowMessage, setModalShowMessage] = useState(false);
  //const [loading, setLoading] = useState(false);


  
  // const handleModalMessageClose = () => {
  //   //setModalShowMessage(false);
  //   onShowModalMessage();
  // };


  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isSubmitting,
    handleSubmit,
    setSubmitting,
    setFieldError,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: registerSchema,
    onSubmit: (values) => {

      if (values.password !== values.confirmPassword) {
        setFieldError('confirmPassword', 'Passwords do not match');
        setSubmitting(false);
        return;
      }

      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('surname', values.surname);
      formData.append('username', values.username);

      if (values.avatar) {
        console.log('values.avatar: ', values.avatar);
        formData.append('avatar', values.avatar);
      }

      register(formData)
        .then(() => {
          
          onCloseModalR(); 
          
          
          
        })
        .catch((err) => {
          console.log(err);
          setFieldError('email', err.response.data.message);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return user ? (
    <Navigate to="/" />
  ) : (
    <div className="Register">

      <form onSubmit={handleSubmit}>
        <InputGroup
          label="Name"
          name="name"
          type="text"
          value={values.name}
          error={touched.name && errors.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your name"
        />
        <InputGroup
          label="Surname"
          name="surname"
          type="text"
          value={values.surname}
          error={touched.surname && errors.surname}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your surname"
        />
        <InputGroup
          label="username"
          name="username"
          type="text"
          value={values.username}
          error={touched.username && errors.username}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your username"
        />
        <InputGroup
          label="Email"
          name="email"
          type="email"
          value={values.email}
          error={touched.email && errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your email"
        />
        <InputGroup
          label="Password"
          name="password"
          type="password"
          value={values.password}
          error={touched.password && errors.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your password"
        />
        <InputGroup
          label="Repeat Password"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={touched.confirmPassword && errors.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Repeat your password"
        />
        <InputGroup
          label="Profile Picture"
          name="avatar"
          type="file"
          onChange={(event) => {
            setFieldValue("avatar", event.currentTarget.files[0]);
          }}
          placeholder="Upload your Profile Picture"
        />

        <button type="submit" className={`btnDetails btn-${isSubmitting ? 'btn-submitting' : 'btnDetails'}`}>
          {isSubmitting ? "Submitting..." : "Register"}
        </button>
      </form>
      {/* <ModalMessage show={modalShowMessage} onHide={handleModalMessageClose} /> */}
    </div>
  );
}

export default Register;



