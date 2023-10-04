
import './ProductDetails.css';
import { buyProduct, getProductDetails } from "../../services/ProductsServices";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCardDetail from '../../components/ProductCardDetail/ProductCardDetail';

const Message = ({ message }) => (
    <section>
      <p>{message}</p>
    </section>
  );

  const ProductDetails = () => {
    const { id } = useParams();
    const [ product, setProduct ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ message, setMessage ] = useState("");
    
    useEffect(() => {
        getProductDetails(id)
        .then((product) => {
          setProduct(product);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
  
      // Check to see if this is a redirect back from Checkout
      const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [id]);
  
  const handleCheckout = async () => {
    buyProduct(product)
      .then((session) => {
        window.location.href = session.url;
      })
      .catch((error) => {
        console.error(error);
        setMessage("Something went wrong 😭");
      });
  }  


    if (isLoading) {
      return <p>Loading...</p>;
    }
  
    if (!product) {
      return <p>Product not found 🥺</p>;
    }
  
  
    return (
      <div className="container row ProductDetails">
        <div className="Banner">
          <Link to="/editor">
            <img src="/public/img/muestra.png" alt="muestra" className="muestra" />
          </Link>
        </div>
        <div>
          <ProductCardDetail product={product} onCheckout={handleCheckout} />
        </div>
        {/*<form>
          <div className="mb-3">
            <label htmlFor="comment" className="form-label">Escribe tu comentario</label>
            <textarea
              className="form-control"
              id="comment"
              value="comment"
              placeholder="Escribe tu comentario"
            />
          </div>
          <button type="submit" className="btn btn-primary">Enviar comentario</button>
        </form>
        <div className="comment-list">
          <h2>Comentarios</h2>
          <ul className="list-group">
            
              <li className="list-group-item">
                <div className="comment-info">
                  <p>comentario </p>
                  <p>Fecha: fecha</p>
                 
                    <button className="btn btn-danger">Borrar</button>
                </div>
              </li>
 
          </ul>
    </div>*/}
      </div>
    );
  };
  
  export default ProductDetails;