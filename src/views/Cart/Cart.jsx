import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import {buyProduct} from '../../services/ProductsServices';
import { useEffect, useState } from "react";

function Cart() {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal,
  } = useCart();
  const [message, setMessage] = useState("");
  const { emptyCart } = useCart();
  
  
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const successParam = searchParams.get("success");

    if (successParam === "true") {
      emptyCart();
 
    }
  }, []);

    const handleCheckout = async () => {
      buyProduct(items)
        .then((session) => {
          window.location.href = session.url;
        })
        .catch((error) => {
          console.error(error);
          setMessage("Something went wrong 😭");
        });
    
  };

  if (isEmpty) return <p>Your cart is empty</p>;

  return (
    <div className="container flex flex-column">
      <div className="row">
      <div className="Banner">
      <Link to="/editor"> 
      <img src='/public/img/muestra.png' alt="muestro" className="muestra" /> 
      </Link>

      </div>

        <div className="col-md-12">
          <h1 className="my-4">Cart ({totalUniqueItems})</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-9">
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Image</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <img src={item.image} width="50px" alt={item.name} />
                  </td>
                  <td>{item.price} €</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      className="btn btn-secondary"
                      onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-3">
          <div className="total-box">
            <h3>Total: {cartTotal.toFixed(2)} €</h3>
            <Button variant="primary" onClick={handleCheckout}>
              Checkout
            </Button>
            <Button variant="primary" onClick={emptyCart}>
              delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;