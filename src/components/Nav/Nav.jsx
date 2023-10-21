import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Nav.css";
import { useAuthContext } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";

import { logout } from "../../stores/AccessTokenStore";
import { useCart } from "react-use-cart";

import { getSearch } from "../../services/ProductsServices";
import { useAppContext } from "../../contexts/AppContext";
import ModalR from "../Modal/ModalR";
import ModalMessage from "../Modal/ModalMessage";
import ModalL from "../Modal/ModalL";
import { Cart2 } from "react-bootstrap-icons";

const Nav = (product) => {
  const { user, isLoading } = useAuthContext();
  const [userState, setUserState] = useState(null);

  const { totalItems, emptyCart } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const { setGlobalSearchResults } = useAppContext();
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  //modales
  const [showModalR, setShowModalR] = useState(false);
  const [showModalL, setShowModalL] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  // Función para cerrar ModalR y mostrar ModalMessage
  // const handleCloseModalR = () => {
  //   setShowModalR(false);
  //   setShowModalMessage(true);
  // };

  // const handleShowModalL = () => {
  //   setShowModalL(true);
  // };



  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery.trim() !== "") {
      getSearch(searchQuery)
        .then((response) => {
          console.log("Resultados de búsqueda:", response);
          setSearchQuery("");
          setGlobalSearchResults(response);
          setSearchResults(response);
          navigate(`/results/${searchQuery}`);
        })
        .catch((error) => {
          console.error("Error al realizar la búsqueda:", error);
        });
    }

  };

  useEffect(() => {
    if (!isLoading) {
      setUserState(user);
    }
  }, [user, isLoading]);

  const isAdmin = userState?.isAdmin || false;

  const handleLogout = () => {
    emptyCart();
    logout();
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand text-warning">
          <img src="\img\onClick-logo.png" alt="" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Products
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink
                    to="/cameras"
                    className="dropdown-item"
                    aria-current="page"
                  >
                    Cameras
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/lens" className="dropdown-item">
                    Lens
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/accessories" className="dropdown-item">
                    Accessories
                  </NavLink>
                </li>
              </ul>
            </li>
            <form
              className="d-flex search-form mx-4"
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(e);
                getSearch(searchQuery)
                  .then((response) => {
                    console.log("Resultados de búsqueda:", response);

                    setSearchResults(response);
                  })
                  .catch((error) => {
                    console.error("Error al realizar la búsqueda:", error);
                  });
              }}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <Link
                to={`/results/${searchQuery}`}
                className="btn btn-outline-success"
                type="submit"
              >
                Search
              </Link>
            </form>
            <li className="nav-item">
              <NavLink to="/images" className="nav-link text-warning">
                Image Gallery
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/tool-landing" className="nav-link text-warning">
                PhotoIA
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {userState ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={userState.avatar}
                    alt="Avatar"
                    className="avatar-img"
                  />
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      to={`/profile/${user.id}`}
                      className="dropdown-item"
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    {isAdmin && (
                      <NavLink to="/create" className="dropdown-item">
                        Create product
                      </NavLink>
                    )}
                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                    <NavLink
                      to="/"
                      className="dropdown-item"
                      onClick={handleLogout}
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li></li>
                {showMessage && (
                  <ModalMessage
                    show={showMessage}
                    onHide={() => setShowMessage(false)}
                  />
                )}
                <li className="nav-item">
                  <ModalR show={showModalR} />
                </li>
                <li className="nav-item">
                  <ModalL show={showModalL} />
                </li>
              </>
            )}
            <li className="nav-item cart-nav">
              <NavLink className="a-cart" to={"/cart"}>
              <div className="cart-icon-nav">
                <Cart2 className="cart-icon-nav"  />
                <p className="number-cart" >{totalItems}</p>
                </div>
              </NavLink>
            </li>
            {/* <li className="nav-item" style={{ marginTop: '10px'}}>
                  <NavLink className="number-cart" to={"/cart"}>
                  <p className="cart-nav-btn">{totalItems}</p>
                  </NavLink>
                  </li> */}
          </ul>
        </div>
      </div>
      {/* {showModalMessage && (
        <ModalMessage
          show={showModalMessage}
          onHide={() => setShowModalMessage(false)}
        />
      )} */}
    </nav>
  );
};

export default Nav;
