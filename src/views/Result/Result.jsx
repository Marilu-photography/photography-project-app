import { useEffect } from "react";
import ProductsCard from "../../components/ProductCard/productsCard1";
import { useAppContext } from "../../contexts/AppContext";
import { useParams } from 'react-router-dom';



const Result = () => {
    const { searchQuery } = useParams();
    const { searchResults, clearSearchResults } = useAppContext();

    useEffect(() => {
        return () => {
          clearSearchResults();
        };
      }, []);
    
      if (!searchResults.length) {
        return <p>No products found 🥺</p>;
      }




    return (
        <div>
            <h1>Results:  {searchQuery} </h1>
            <div className="row mb-4">
                {searchResults.map((product) => (
                    <div key={product._id} className="col-12 col-md-6 col-lg-4 mb-5">
                        <ProductsCard product={product} />
                    </div>
                ))}
        </div>
        </div>
    )
}

export default Result