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
    <div className="container Store  d-flex align-items-center flex-column">
      <h1 className="mb-4">Store</h1>

      <div className="row mb-4">
        {products.map((product) => (
            <div key={product._id} className="col-xl-3 col-lg-4 col-sm-6" >
            <ProductsCard product={product} />
            </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
