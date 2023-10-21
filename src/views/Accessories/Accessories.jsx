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
    const [filters, setFilters] = useState({
      brands: [],
      priceRange: [],
      condition: [],
      accessoriesType: [],
    });
  
    const [filterApplied, setFilterApplied] = useState(false);
    const [filtersCollapsed, setFiltersCollapsed] = useState(true);
  
    useEffect(() => {
      getProductList()
        .then((products) => {
          const accessoriesProducts = products.filter(
            (product) => product.category === "Accessory"
          );
          setProducts(accessoriesProducts);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    }, []);
  
    const applyFilters = (filters) => {
      const { brands, priceRange, condition, accessoriesType } = filters;
  
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
  
      if (accessoriesType.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
        accessoriesType.includes(product.accessoriesType)
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
        accessoriesType: [],
      });
  
      getProductList()
        .then((products) => {
          const accessoriesProducts = products.filter(
            (product) => product.category === "Accessory"
          );
          setProducts(accessoriesProducts);
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
  
    const handleAccessoriesTypeFilter = (accessoriesType) => {
      setFilters((prevFilters) => {
        if (prevFilters.accessoriesType.includes(accessoriesType)) {
          return {
            ...prevFilters,
            accessoriesType: prevFilters.accessoriesType.filter(
              (item) => item !== accessoriesType
            ),
          };
        } else {
          return {
            ...prevFilters,
            accessoriesType: [...prevFilters.accessoriesType, accessoriesType],
          };
        }
      });
    };
  
    const brandOptions = [
      "Canon",
      "Godox",
      "SanDisk",
      "Manfrotto",
    ];
  
    const priceRangeOptions = ["0-50", "50-100", "100-200"];
  
    const conditionOptions = ["New", "Used"];
  
    const accessoriesTypeOptions = [
        "Battery",
        "Flash",
        "Memory Card",
        "Camera Bag",
        "Camera Case",
        "Tripod",
        "Other"
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
      <div className="Accessories mb-5">
        <div className="Banner">
        <Link to="https://lucebreiro.github.io/Palntas-vs-Comunismo/" target="_blank">
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
                <h4>Accessories Type:</h4>
                {accessoriesTypeOptions.map((accessoriesType) => (
                  <label className="checkbox-label" key={accessoriesType}>
                    <input
                      type="checkbox"
                      value={accessoriesType}
                      checked={filters.accessoriesType.includes(accessoriesType)}
                      onChange={() => handleAccessoriesTypeFilter(accessoriesType)}
                    />
                    {accessoriesType}
                  </label>
                ))}
                <hr className="hr-cameras mb-2" />
              </div>
              <button className="m-1 btn-filter" onClick={handleApplyFilters}>
                Apply Filters
              </button>
              <button className="m-1 btn-filter" onClick={handleClearFilters}>
                Clear Filters
              </button>
            </div>
            <div className="row d-flex camera-product-container">
              <div>
                <h1 className="h1-cameras"> Accessories</h1>
              </div>
  
              {displayProducts.length === 0 ? (
                <p>No Results Found</p>
              ) : (
                <div className="row camera-cards-container">
                  {displayProducts.map((product) => (
                    <div
                      key={product._id}
                      className="col-12 col-md-6 col-lg-6 mb-4"
                    >
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

export default AccessoriesList;