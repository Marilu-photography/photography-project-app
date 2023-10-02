import { useEffect, useState } from "react";
//import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { getProductList } from "../../services/ProductsServices";
import ProductsCard from "../../components/ProductCard/productsCard1";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProductList()
      .then((products) => {
        setProducts(products);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!products.length) {
    return <p>No products found 🥺</p>;
  }



  return (
    <div className="Store">
      <h1>Store</h1>

      <div className="row">
        {products.map((product) => (
            <div key={product._id} className="col-12 col-md-6 col-lg-4" >
            <ProductsCard product={product} />
            </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
