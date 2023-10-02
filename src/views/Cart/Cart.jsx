import { useCart } from "react-use-cart";
import { buyProduct } from "../../services/ProductsServices";



function Cart() {
    const {
      isEmpty,
      totalUniqueItems,
      items,
      updateItemQuantity,
      removeItem,
      cartTotal,
    } = useCart();
  
    if (isEmpty) return <p>Your cart is empty</p>;

    const handleCheckout = async () => {
        buyProduct(products)
          .then((session) => {
            window.location.href = session.url;
          })
          .catch((error) => {
            console.error(error);
            setMessage("Something went wrong 😭");
          });
      }
  
    return (
      <>
        <h1>Cart ({totalUniqueItems})</h1>
  
        <ul>
          {items.map((item) => (
            <li key={item.id}>
               {item.name} - 
               <img src={item.image} width="50px"></img> - 
               {item.price} € - 
                Quantity: {item.quantity}
                <button
              onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
            >
              -
            </button>
            <button
              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
            <button onClick={() => removeItem(item.id)}>&times;</button>
            </li>
          ))}
        </ul>
        <p>{cartTotal}</p>
        <div>
            <button onClick={handleCheckout}>Checkout</button>
        </div>
      </>
    );
  }

  export default Cart;