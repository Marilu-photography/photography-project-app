import { Route, Routes } from "react-router-dom";
import "./App.css";
//import Navbar from "./components/Navbar/Navbar";
import Home from "./views/Home/Home";
import Cart from "./views/Cart/Cart";
import Editor from "./views/Editor/Editor";
import ProductDetails from "./views/ProductDetails/ProductDetails";
import { useAuthContext } from "./contexts/AuthContext";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { CartProvider } from "react-use-cart";
import CreateProducts from "./views/CreateProducts/CreateProducts";
import ImagesList from "./views/Images/ImagesList";
import UserProfile from "./views/User/UserProfile";
import EditProduct from "./views/EditProducts/EditProducts";
import CameraList from "./views/Camera/Camera";
import LensList from './views/Lens/Lens';
import AccessoriesList from "./views/Accessories/Accessories";
import Nav from "./components/Nav/Nav";


function App() {
  const { isAuthenticationFetched } = useAuthContext();

  return (
    <>

      <Nav />
      {!isAuthenticationFetched ? (
        <p>Loading...</p>
      ) : (
        <CartProvider>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cameras" element={<CameraList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/lens" element={<LensList />} />
            <Route path="/accessories" element={<AccessoriesList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/images" element={<ImagesList />} />
            <Route path="/profile/:id" element={<UserProfile />} />
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/editor/:id" element={<Editor />} />
              <Route path="/create" element={<CreateProducts />} />
              <Route path="/edit-product/:productId" element={<EditProduct />} />


            </Route>

          </Routes>
        </CartProvider>
      )}
    </>
  );
}

export default App;
