import { useState, useEffect } from "react";
import { getProductList } from "../../services/ProductsServices";
import ProductsCard from "../../components/ProductCard/productsCard1";
import { Link } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import "./Camera.css";

const CameraList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchResults } = useAppContext();
  const [filters, setFilters] = useState({
    brands: [],
    priceRange: [],
    condition: [],
    cameraType: [],
  });

  const [filterApplied, setFilterApplied] = useState(false);
  const [filtersCollapsed, setFiltersCollapsed] = useState(true);

  

  useEffect(() => {
    getProductList()
      .then((products) => {
        const cameraProducts = products.filter(
          (product) => product.category === "Camera"
        );
        setProducts(cameraProducts);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  const applyFilters = (filters) => {
    const { brands, priceRange, condition, cameraType } = filters;

    let filteredProducts = [...products];

    if (brands.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        brands.some((brand) => product.name.includes(brand))
      );
    }

    if (priceRange.length > 0) {
      filteredProducts = filteredProducts.filter((product) => {
        const price = product.price;
        return priceRange.some((range) => {
          const [min, max] = range.split("-");
          return price >= Number(min) && price <= Number(max);
        });
      });
    }

    if (condition.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        condition.includes(product.condition)
      );
    }

    if (cameraType.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        cameraType.includes(product.cameraType)
      );
    }

    setProducts(filteredProducts);
    setFilterApplied(true);
  };

  const handleApplyFilters = () => {
    applyFilters(filters);
  };

  const handleClearFilters = () => {
    setFilterApplied(false);
    setFilters({
      brands: [],
      priceRange: [],
      condition: [],
      cameraType: [],
    });

    getProductList()
      .then((products) => {
        const cameraProducts = products.filter(
          (product) => product.category === "Camera"
        );
        setProducts(cameraProducts);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleBrandFilter = (brand) => {
    setFilters({
      ...filters,
      brands: filters.brands.includes(brand)
        ? filters.brands.filter((item) => item !== brand) 
        : [...filters.brands, brand],
    });
  };
  const handlePriceRangeFilter = (range) => {
    setFilters((prevFilters) => {
      if (prevFilters.priceRange.includes(range)) {
        return {
          ...prevFilters,
          priceRange: prevFilters.priceRange.filter((item) => item !== range),
        };
      } else {
        return {
          ...prevFilters,
          priceRange: [...prevFilters.priceRange, range],
        };
      }
    });
  };

  const handleConditionFilter = (condition) => {
    setFilters((prevFilters) => {
      if (prevFilters.condition.includes(condition)) {
        return {
          ...prevFilters,
          condition: prevFilters.condition.filter((item) => item !== condition),
        };
      } else {
        return {
          ...prevFilters,
          condition: [...prevFilters.condition, condition],
        };
      }
    });
  };

  const handleCameraTypeFilter = (cameraType) => {
    setFilters((prevFilters) => {
      if (prevFilters.cameraType.includes(cameraType)) {
        return {
          ...prevFilters,
          cameraType: prevFilters.cameraType.filter((item) => item !== cameraType),
        };
      } else {
        return {
          ...prevFilters,
          cameraType: [...prevFilters.cameraType, cameraType],
        };
      }
    });
  };

  const brandOptions = [
    "Canon",
    "Nikon",
    "Sony",
    "Fujifilm",
    "Panasonic",
    "Olympus",
    "Kodak",
  ];

  const priceRangeOptions = [
    "0-500",
    "500-1000",
    "1000-2000",
  ];

  const conditionOptions = ["New", "Used"];

  const cameraTypeOptions = [
    "Mirrorless",
    "DSLR",
    "Compact",
    "Bridge",
    "Action",
    "Medium Format",
    "Other",
  ];


  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!products.length && !searchResults) {
    return <p>No products found 🥺</p>;
  }

  const displayProducts =
    searchResults && searchResults.length > 0 ? searchResults : products;

    const toggleFilters = () => {
      setFiltersCollapsed(!filtersCollapsed);
    };

  return (
    <div className="Camera mb-5">
      <div className="Banner">
        <Link to="/tool-landing">
          <img src="/img/eplantas-vs-com.png" alt="muestra" className="muestra" />
        </Link>
      </div>
      <div className="container contenedor product-container">
        <div className="d-flex align-items-start filter-list-container">
          <div className="filters-container ">
            <h3>Filters</h3>
            <div className="d-flex flex-column">
              <h4>Brand:</h4>
              {brandOptions.map((brand) => (
                <label className="checkbox-label" key={brand}>
                  <input
                    type="checkbox"
                    value={brand}
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleBrandFilter(brand)}
                  />
                  {brand}
                </label>
              ))}
              <hr className="hr-cameras mb-2" />
            </div>
            <div className="d-flex flex-column">
              <h4>Price Range:</h4>
              {priceRangeOptions.map((range) => (
                <label className="checkbox-label" key={range}>
                  <input
                    type="checkbox"
                    value={range}
                    checked={filters.priceRange.includes(range)}
                    onChange={() => handlePriceRangeFilter(range)}
                  />
                  {range} €
                </label>
              ))}
              <hr className="hr-cameras mb-2" />
            </div>
            <div className="d-flex flex-column">
              <h4>Condition:</h4>
              {conditionOptions.map((condition) => (
                <label className="checkbox-label" key={condition}>
                  <input
                    type="checkbox"
                    value={condition}
                    checked={filters.condition.includes(condition)}
                    onChange={() => handleConditionFilter(condition)}
                  />
                  {condition}
                </label>
              ))}
              <hr className="hr-cameras mb-2" />
            </div>
            <div className="d-flex flex-column">
              <h4>Camera Type:</h4>
              {cameraTypeOptions.map((cameraType) => (
                <label className="checkbox-label" key={cameraType}>
                  <input
                    type="checkbox"
                    value={cameraType}
                    checked={filters.cameraType.includes(cameraType)}
                    onChange={() => handleCameraTypeFilter(cameraType)}
                  />
                  {cameraType}
                </label>
              ))}
              <hr className="hr-cameras mb-2" />
            </div>
            <button className="m-1 btn-filter" onClick={handleApplyFilters}>Apply Filters</button>
            <button className="m-1 btn-filter" onClick={handleClearFilters}>Clear Filters</button>
          </div>
          <div className="row d-flex camera-product-container">
            <div>
              <h1 className="h1-cameras"> Cameras</h1>
            </div>

            {displayProducts.length === 0 ? (
              <p>No Results Found</p>
            ) : (
              <div className="row camera-cards-container">
                {displayProducts.map((product) => (
                  <div key={product._id} className="col-12 col-md-6 col-lg-6 mb-4">
                    <ProductsCard product={product} />
                  </div>
                ))}

              </div>

            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraList;
