import InputGroup from '../../components/InputGroup/InputGroup';
import { useFormik } from 'formik';
import { loginSchema } from '../../utils/yup.schemas';
import { activateUser, login as loginRequest } from '../../services/AuthServices';
import { useNavigate, Navigate, useLocation, Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const location = useLocation();
  const activateUserId = new URLSearchParams(location.search).get('activate');
  const { login, user } = useAuthContext();
  const navigate = useNavigate();
  const { newUser, setNewUser } = useState(null);

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
  } = useFormik({
    initialValues: initialValues,
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      loginRequest(values)
        .then((res) => {
  
          login(res.accessToken, () => navigate('/'));
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

   useEffect(() => {
    if(activateUserId) {
      activateUser(activateUserId)
       .then(() => {
         console.log(activateUserId)

       })
       .catch((err) => {
         console.log(err);
       });
    }
     
   }, [activateUserId]);

  return user ? (
    <Navigate to="/" />
  ) : (
    <div className="Login">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
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

        <button type="submit" className={`btn btn-${isSubmitting ? 'secondary' : 'primary'}`}>
          {isSubmitting ? "Submitting..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;