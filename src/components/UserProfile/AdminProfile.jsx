import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import './AdminProfile.css'
import { PencilSquare } from "react-bootstrap-icons";
import { Trash3 } from "react-bootstrap-icons";
import { deleteProduct } from "../../services/ProductsServices";


const AdminProfile = ({ user, products, setProducts, orders, setOrders }) => {
    const { username, name, surname, avatar, images } = user;
    const [isLoading, setIsLoading] = useState(true);
    const { user: currentUser } = useAuthContext();
    const [activeTab, setActiveTab] = useState("productsList");
    const [productsList, setProductsList] = useState([]);


    useEffect(() => {
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    }

    const handleDelete = (product) => {
        deleteProduct(product._id)
            .then(() => {
                setProducts((prevProducts) => prevProducts.filter((p) => p._id !== product._id));
            })
            .catch((error) => {
                console.error("Error deleting product:", error);
            });

    };


    const sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name));


    return (
        <div>
            <div className="row d-flex justify-content-center align-items-center h-100 mt-5">
                <div className="col col-lg-9 col-xl-7">
                    <div>
                        <div
                            className="rounded-top text-white d-flex flex-row"
                            style={{ backgroundColor: "#000", height: "200px" }}
                        >
                            <div
                                className="ms-4 mt-5 d-flex flex-column align-items-center"
                                style={{ width: "300px" }}
                            >
                                <img
                                    src={avatar}
                                    alt={username}
                                    className="img-thumbnail mt-5 mb-2"
                                    style={{
                                        width: "200px",
                                        height: "200px",
                                        zIndex: 1,
                                        objectFit: "cover",
                                    }}
                                />
                                {currentUser && currentUser.id === user.id && (
                                    <div className="flex-row">
                                        <Link
                                            to={`/profile/${user.id}/edit`}
                                            className="btn btn-outline-dark mb-3"
                                            data-mdb-ripple-color="dark"
                                            style={{ width: "150px", zIndex: 1 }}
                                        >
                                            Edit profile
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <div className="ms-1" style={{ marginTop: "120px" }}>
                                <h5>@{username}</h5>
                                <p>
                                    {name} {surname}
                                </p>
                            </div>
                        </div>
                        <div
                            className="px-4 py-5 text-black"
                            style={{ backgroundColor: "#f8f9fa" }}
                        >
                        </div>
                        <div className="card-body p-4 text-black mt-5">
                            <ul className="nav nav-tabs border-0" id="myTab">
                                <li className="nav-item">
                                    <a
                                        className={`nav-link text-uppercase ${activeTab === "productsList" ? "active" : ""}`}
                                        onClick={() => handleTabClick("productsList")}
                                        id="products-list-tab"
                                        data-bs-toggle="tab"
                                        href="#productsList"
                                        role="tab"
                                        aria-controls="productsList"
                                        aria-selected={activeTab === "productsList"}
                                    >
                                        Product List
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={`nav-link text-uppercase ${activeTab === "orders" ? "active" : ""}`}
                                        onClick={() => handleTabClick("orders")}
                                        id="orders-tab"
                                        data-bs-toggle="tab"
                                        href="#orders"
                                        role="tab"
                                        aria-controls="orders"
                                        aria-selected={activeTab === "orders"}
                                    >
                                        Orders
                                    </a>
                                </li>
                            </ul>
                            <div className="tab-content mb-5" id="myTabContent">
                                <div className={`tab-pane fade ${activeTab === "productsList" ? "active show" : ""}`} id="productsList" role="tabpanel" aria-labelledby="productsList-tab">
                                    <table className="mt-3 " style={{ width: '100%' }}>
                                        <thead className="products-list-head">
                                            <tr>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Category</th>
                                                <th>Price</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {sortedProducts.map((product) => (
                                                <tr key={product._id} className="product-item" >
                                                    <td>
                                                        <img src={product.image} alt={product.name} style={{ width: '50px' }} />
                                                    </td>
                                                    <td>{product.name}</td>
                                                    <td>{product.category}</td>
                                                    <td>{product.price}</td>
                                                    <td className="action-row">
                                                        <Link
                                                            to={`/edit-product/${product._id}`}
                                                            className=" mb-3"
                                                            data-mdb-ripple-color="dark"
                                                        >
                                                            <PencilSquare style={{ color: 'green' }} />

                                                        </Link>
                                                        <button
                                                            className="delete-btn mb-3"
                                                            data-mdb-ripple-color="dark"
                                                            onClick={() => handleDelete(product)}
                                                        >
                                                            <Trash3 style={{ color: 'red' }} />
                                                        </button>
                                                    </td>

                                                </tr>)
                                            )}
                                        </tbody>
                                    </table>

                                </div>

                            </div>
                            <div className="tab-content mb-5" id="myTabOrdersContent">
                                <div className={`tab-pane fade ${activeTab === "orders" ? "active show" : ""}`} id="orders" role="tabpanel" aria-labelledby="orders-tab">
                                    <table className="mt-3 " style={{ width: '100%' }}>
                                        <thead className="orders-list-head">
                                            <tr>
                                                <th>Nº</th>
                                                <th>Name</th>
                                                <th>Category</th>
                                                <th>Price</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {sortedProducts.map((product) => (
                                                <tr key={product._id} className="product-item" >
                                                    <td>
                                                        <img src={product.image} alt={product.name} style={{ width: '50px' }} />
                                                    </td>
                                                    <td>{product.name}</td>
                                                    <td>{product.category}</td>
                                                    <td>{product.price}</td>
                                                    <td className="action-row">
                                                        <Link
                                                            to={`/edit-product/${product._id}`}
                                                            className=" mb-3"
                                                            data-mdb-ripple-color="dark"
                                                        >
                                                            <PencilSquare style={{ color: 'green' }} />

                                                        </Link>
                                                        <button
                                                            className="delete-btn mb-3"
                                                            data-mdb-ripple-color="dark"
                                                            onClick={() => handleDelete(product)}
                                                        >
                                                            <Trash3 style={{ color: 'red' }} />
                                                        </button>
                                                    </td>

                                                </tr>)
                                            )}
                                        </tbody>
                                    </table>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
