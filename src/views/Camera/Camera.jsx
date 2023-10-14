import { useState, useEffect } from "react";
import { getProductList } from "../../services/ProductsServices";
import ProductsCard from "../../components/ProductCard/productsCard1";
import { Link } from "react-router-dom";

const CameraList = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getProductList()
            .then((products) => {
                const cameraProducts = products.filter(product => product.category === 'Camera');
                setProducts(cameraProducts);
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
        return <p>No camera products found 📷</p>;
    }



    return (
        <div className="Camera">
        <div className="Banner">
          <Link to="/editor">
            <img src="/public/img/muestra.png" alt="muestra" className="muestra" />
          </Link>
        </div>
            <h1>Cameras</h1>
    
            <div className="row display-flex">
                {products.map((product) => (
                    <div key={product._id} className="col-12 col-md-6 col-lg-4 mb-4">
                        <ProductsCard product={product}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CameraList;