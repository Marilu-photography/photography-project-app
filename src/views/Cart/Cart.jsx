import { Button } from "react-bootstrap";
import { useCart } from "react-use-cart";

function Cart() {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal,
  } = useCart();

  const handleCheckout = async () => {
    console.log("Starting checkout process...");
  
    await fetch("http://localhost:5173/products/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products: items }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log("Response from server:", res);
  
        if (res.url) {
          console.log("Redirecting to checkout...");
          window.location.assign(res.url);
        }
      })
      .catch((error) => {
        console.error("Error during checkout:", error);
      });
  };

  if (isEmpty) return <p>Your cart is empty</p>;

  return (
    <div className="container flex flex-column">
      <div className="row">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;