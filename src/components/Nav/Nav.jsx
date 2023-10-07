
import { Link } from "react-router-dom";
import "./Nav.css";
import { useAuthContext } from '../../contexts/AuthContext';
import { useEffect, useState } from "react";
import { logout } from '../../stores/AccessTokenStore';
import { useCart } from 'react-use-cart';

const Nav = ( product ) => {
  const { user, isLoading } = useAuthContext();
  const [userState, setUserState] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    if (!isLoading) {
      setUserState(user);
    }
  }, [user, isLoading]);

  const isAdmin = userState?.isAdmin || false;

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link to='/' className="navbar-brand text-warning">
          MariLu
        </Link>
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
              <li className="nav-item">
                <Link to='/cameras' className="nav-link active text-warning" aria-current="page">
                  Cameras 
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/lens' className="nav-link text-warning" >
                  Lens
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/accessories' className="nav-link text-warning" >
                  Accessories
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/editor' className="nav-link text-warning" >
                  Edit Photos
                </Link>
              </li>
              <li className="nav-item">
              <button className="card-button" onClick={() => addItem({...product, id: product._id})}>
            <svg className="svg-icon" viewBox="0 0 20 20">
              <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
              <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
              <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
            </svg>
          </button>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" >
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" >
                      Another action
                    </a>
                  </li>
                  <li>
                    {" "}
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" >
                      Something else here
                    </a>
                  </li>
                </ul>
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
        <img src={userState.avatar} alt="Avatar" className="avatar-img" />
      </a>
      <ul className="dropdown-menu">
        <li>
          <Link to='/profile' className="dropdown-item">
            Profile
          </Link>
        </li>
        <li>
        {isAdmin && (
            
          <Link to='/create' className="dropdown-item">
            Create product
          </Link>
         )}
        </li>
        
        <li>
        <hr className="dropdown-divider" />
          <Link to='/' className="dropdown-item" onClick={ handleLogout } >
            Logout
          </Link>
        </li>
        
      </ul>
    </li>
  ) : (
    <>
    <li className="nav-item">
      <Link to='/register' className="nav-link">
        Register
      </Link>
      </li>
    <li className="nav-item">
      <Link to='/login' className="nav-link">
        Iniciar sesión
      </Link>
    </li>
    </> 

  )}
</ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Nav;
  