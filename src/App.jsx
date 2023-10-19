import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
//import Navbar from "./components/Navbar/Navbar";
import { useAuthContext } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";

import Home from "./views/Home/Home";
import Cart from "./views/Cart/Cart";
import Editor from "./views/Editor/Editor";
import ProductDetails from "./views/ProductDetails/ProductDetails";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import CreateProducts from "./views/CreateProducts/CreateProducts";
import ImagesList from "./views/Images/ImagesList";
import UserProfile from "./views/User/UserProfile";
import EditProduct from "./views/EditProducts/EditProducts";
import CameraList from "./views/Camera/Camera";
import LensList from './views/Lens/Lens';
import AccessoriesList from "./views/Accessories/Accessories";
import EditProfile from "./views/EditProfile/EditProfile";
import ActivateUser from "./views/MISC/ActivateUser";
import Result from "./views/Result/Result";
import ToolLanding from "./views/Tool-Landing/ToolLanding";



function App() {
  const { isAuthenticationFetched } = useAuthContext();

  const location = useLocation();

  const shouldShowNavAndFooter = !location.pathname.startsWith('/editor');

  return (
    <>

      {shouldShowNavAndFooter && <Nav />}
      {!isAuthenticationFetched ? (
        <p>Loading...</p>
      ) : (


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activate/:id" element={<ActivateUser />} />
          <Route path="/results/:searchQuery" element={<Result />} />
          <Route path="/cameras" element={<CameraList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/lens" element={<LensList />} />
          <Route path="/accessories" element={<AccessoriesList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/images" element={<ImagesList />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/profile/:userId/edit" element={<EditProfile />} />
          <Route path="/tool-landing" element={<ToolLanding />} />
          {shouldShowNavAndFooter && (
            <Route path="/" element={<ProtectedRoute />}>

              <Route path="/create" element={<CreateProducts />} />
              <Route path="/edit-product/:productId" element={<EditProduct />} />
            </Route>
          )}
          <Route path="/editor/:id" element={<Editor />} />
        </Routes>

      )}
      {shouldShowNavAndFooter && <Footer />}

    </>
  );
}

export default App;
