
import "./ProductCardDetail.css";
import { useCart } from 'react-use-cart';
import { Link } from 'react-router-dom';
import { deleteProduct } from "../../services/ProductsServices";



const ProductCardDetail = ({ product  }) => {

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(product._id)
        .then(() => {
          console.log('Product deleted');
        })
        .catch(error => {
          console.error('Error deleting product:', error);
        });
    }
  };

  const { addItem } = useCart();

  if (!product) {
    console.error("Warning: 'product' prop is missing in ProductCard!");
    return null;
  }

  const {
    name,
    description,
    price,
    image,
    category,
    condition,
    cameraType,
    lensType,
    accessoryType,
  } = product;



  return (
    <div className="ProductCardDetail">
      <div className="row">
        <div className="col-md-6">
          <div className="img-product">
            <img src={image} className="card-img-top" alt={name} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h1 className="card-title">{name}</h1>
            <h5 className="card-title">Category: {category}</h5>
            <h5 className="card-title">Condition: {condition}</h5>
            {cameraType !== null ? (<h5 className="card-title">Camera type: {cameraType}</h5>) : ""}
            {lensType !== null ? (<h5 className="card-title">Lens type: {lensType}</h5>) : ""}
            {category !== "Camera" ? (<h5 className="card-title">{accessoryType}</h5>) : ""}
            <p className="card-text">{description}</p>
            <p className="card-text">
              <span className="fw-bold">Price:</span> {price} €
            </p>
            <button className="btnDetails" onClick={() => addItem({...product, id: product._id})}>Add to cart</button>
            
            <Link className="btnDetails" to={`/edit-product/${product._id}`}> Edit </Link>
            <Link className="btnDetails" onClick={handleDelete} to={'/'}> Delete </Link>

          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCardDetail;
