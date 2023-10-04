
import "./ProductCardDetail.css";


const ProductCardDetail = ({ product, onCheckout  }) => {

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
    <div className="ProductCardDetail container">
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
            <button className="btnDetails" onClick={onCheckout}>Add to cart</button>

          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCardDetail;
