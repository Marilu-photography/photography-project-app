import { Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import { buyProduct } from '../../services/ProductsServices';
import { useEffect, useState } from "react";
import { success } from "../../services/ProductsServices";
import { useAuthContext } from "../../contexts/AuthContext";
import "./Cart.css";
import { Trash3, BagCheck, PlusCircle, DashCircle } from 'react-bootstrap-icons';


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
  const [orderPaid, setOrderPaid] = useState(null);
  const { user: currentUser } = useAuthContext();

  const location = useLocation();
  const params = new URLSearchParams(location.search)
  const successParam = params.get("success");
  const orderId = params.get("orderId");

  useEffect(() => {
    if (successParam === "true" && orderId) {
      setOrderPaid(orderId);
      setMessage("Order placed! You will receive an email confirmation.");
      success(orderId);
      emptyCart();
    }
  }, [successParam, orderId]);

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



  return (
    <div className=" flex flex-column cart-container">
      <div className="row">
        <div className="Banner">
          <Link to="/editor">
            <img src='/img/muestra.png' alt="muestro" className="muestra" />
          </Link>

        </div>

        <div className="col-md-12">
          <h1 className="my-4">Cart ({totalUniqueItems})</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-9">
          <table className="table">
            <thead className="head-cart">
              <tr>
                <th>Product</th>
                <th>Image</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isEmpty ? 
              <h6>Your cart is empty</h6>
              :
               (items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <img
                      src={item.images ? item.images[0] : (item.imageUrl ? item.imageUrl : '')}
                      width="50px"
                      alt={item.name}
                    />
                  </td>
                  <td>{item.price} €</td>
                  <td >
                    <div className="quantity-col">
                    <button
                      className="sum"
                      onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                    >
                      <DashCircle />
                    </button>
                    {item.quantity}
                    <button
                      className="sum"
                      onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                    >
                      <PlusCircle />
                    </button>
                    </div>
                    
                  </td>
                  <td>
                    <button
                      className="btn btn-Delete"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash3 className="icon-trash" />
                    </button>
                  </td>
                </tr>
              ))
              )}
            </tbody>
          </table>
        </div>
        <div className="col-md-3 tb-movil">
          <div className="total-box">
            <h3>Total: {cartTotal.toFixed(2)} €</h3>
            <div className="btn-cart-total mb-4">
            <Button className="btn btn-checkout" onClick={handleCheckout}>
              <BagCheck className="icon-checkout" />
            </Button>
            <Button className="btn-checkout-D" onClick={emptyCart}>
            <Trash3 className="icon-trash" />
            </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;