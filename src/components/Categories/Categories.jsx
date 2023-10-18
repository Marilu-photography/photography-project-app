import { Link } from "react-router-dom";
import "./Categories.css";

const Categories = () => {
  return (
    <div className="container pt-5 d-flex flex-column">
      <div className="d-flex flex-md-row flex-column">
        <div className="col-md-4 category-item">
          <Link  to='/cameras'>
            <div className="img-container-category">
            <img className="img-fluid" src="https://images.unsplash.com/photo-1565551069968-949366aa4cac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNhbWFyYXxlbnwwfDF8MHx8fDI%3D&auto=format&fit=crop&w=500&q=60" alt="category-camera"/>
            </div>
          </Link>
          <strong className="category-item-title ">CAMERAS</strong>
        </div>
        <div className="col-md-4 category-item">
          <Link to='/lens'>
          <div className="img-container-category">
            <img className="img-fluid" src="https://images.unsplash.com/photo-1584647854126-268e13c8bbc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fG9iamV0aXZvJTIwY2FtYXJhfGVufDB8MXwwfHx8Mg%3D%3D&auto=format&fit=crop&w=500&q=60" alt="category-lens"/>
          </div>
          </Link>
          <strong className="category-item-title ">LENS</strong>
        </div>
        <div className="col-md-4 category-item">
          <Link to='/accessories'>
          <div className="img-container-category">
            <img className="img-fluid" src="https://images.unsplash.com/photo-1540749046540-b7d8f98c7e4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2FtYXJhJTIwYm9sc2F8ZW58MHwxfDB8fHwy&auto=format&fit=crop&w=500&q=60" alt="category-accesories"/>
            </div>
          </Link>
          <strong className="category-item-title ">ACCESSORIES</strong>
        </div>
      </div>
    </div>
  );
};

export default Categories;
