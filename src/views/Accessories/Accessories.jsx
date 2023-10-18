import { useState, useEffect } from 'react';
import { getProductList } from '../../services/ProductsServices';
import ProductsCard from '../../components/ProductCard/productsCard1';
import { Link } from 'react-router-dom';
import { useAppContext } from "../../contexts/AppContext";
import './Accessories.css';

const AccessoriesList = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { searchResults } = useAppContext();

    useEffect(() => {
        getProductList()
            .then((products) => {
                 const accessoryProducts = products.filter(product => product.category === 'Accessory');
                setProducts(accessoryProducts);
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
        <div className='Accessories'>
            <div className="Banner">
                <Link to="/editor">
                    <img src="/img/muestra.png" alt="muestra" className="muestra"/>
                </Link>
            </div>
            <h1>Accessories</h1>

            <div className="row display-flex">
                {displayProducts.map((product) => (
                    <div key={product._id} className="col-12 col-md-6 col-lg-4 mb-4">
                        <ProductsCard product={product}/>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default AccessoriesList;