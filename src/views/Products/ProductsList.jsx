import { useEffect, useState } from "react";
import { getProductList } from "../../services/ProductsServices";
import ProductsCard from "../../components/ProductCard/productsCard1";
import { useAppContext } from "../../contexts/AppContext";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { searchResults } = useAppContext();
  
  useEffect(() => {
    getProductList()
      .then((products) => {
        console.log("Ejemplo de producto:", products[0]);
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

  if (!products.length && !searchResults) {
    return <p>No products found 🥺</p>;
  }

  

  const displayProducts = searchResults && searchResults.length > 0
  ? searchResults : products;

  return (
    <div className="container Store d-flex align-items-center flex-column">
      <h1 className="mb-4">Store</h1>

      <div className="row mb-4">
        {displayProducts.map((product) => (
          console.log('Product being rendered:', product),
          <div key={product._id} className="col-12 col-md-6 col-lg-4 mb-5">
            <ProductsCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;