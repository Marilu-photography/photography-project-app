import "./productCard1.css";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";

const ProductsCard = ({ product }) => {
  const { _id, name, category, description, price, images } = product;

  const { addItem } = useCart();

  return (
    <>
<div className="card" style={{ width: '400px', height: '100%'}}>
  <div className="card-img">
  <img src={images[0]} style={{width : '100%' , height : '100%', objectFit: 'contain' }} alt={product.name} />
  </div>
  <div className="card-info">
    <p className="text-title text-truncate">{name} </p>
    <p className="text-title">{category} </p>
    <p className="text-body text-truncate">{description}</p>
  </div>
  <div className="card-footer">
    <span className="text-title price-movil">{price} €</span>
    <Link className="btnDetails" to={`/products/${_id}`}> Details </Link>
    <button className="card-button web-only" onClick={() => addItem({...product, id: product._id})}>
      <svg className="svg-icon" viewBox="0 0 20 20">
        <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
        <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
        <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
      </svg>
    </button>
            <button
                  className="CartBtn mobile-only"
                  onClick={() => addItem({ ...product, id: product._id })}
                >
                  <span className="IconContainerM">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 576 512"
                      fill="rgb(17, 17, 17)"
                      className="cart"
                    >
                      <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                    </svg>
                  </span>
                  {/* <p className="text-detail">Add to Cart</p> */}
                </button>
  </div>
</div>
</>
  );
};

export default ProductsCard;



