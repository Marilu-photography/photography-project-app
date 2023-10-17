import { Fragment, useEffect, useState } from "react";
import ImagesCard from "../ImagesCard/ImagesCard";
import { useAuthContext } from "../../contexts/AuthContext";
import { Button } from "react-bootstrap";
import UploadModal from "../UploadModal/UploadModal";
import { Link } from "react-router-dom";
import { listOrders } from "../../services/OrdersServices";

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const UserProfilePage = ({ user, getUser }) => {
  const { username, name, surname, avatar, images } = user;
  const [isLoading, setIsLoading] = useState(true);
  const { user: currentUser } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("recentPhotos");
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    setIsLoading(false);
    listOrders()
      .then((orders) => {
        const userOrders = orders.filter(order => order.user._id === user.id);
        setOrders(userOrders);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  }

  const handleOrderClick = (orderId) => {
        setExpandedOrderId((prevExpandedOrderId) =>
            prevExpandedOrderId === orderId ? null : orderId
        );
    };

  if (isLoading) {
    return <p>Loading...</p>;
  }
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

                    <Button
                      variant="outline-dark"
                      className="mb-3"
                      style={{ width: "150px", zIndex: 1 }}
                      onClick={() => setShowModal(true)}
                    >
                      Upload Image
                    </Button>

                    <UploadModal
                      show={showModal}
                      onHide={() => setShowModal(false)}
                      getUser={getUser}
                    />
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
              <div className="d-flex justify-content-end text-center py-1">
                <div>
                  <p className="mb-1 h5">{images.length}</p>
                  <p className="small text-muted mb-0">Photos</p>
                </div>
              </div>
            </div>
            <div className="card-body p-4 text-black mt-5">
              <ul className="nav nav-tabs border-0" id="myTab">
                <li className="nav-item">
                  <a
                    className={`nav-link text-uppercase ${activeTab === "recentPhotos" ? "active" : ""}`}
                    onClick={() => handleTabClick("recentPhotos")}
                    id="recentPhotos-list-tab"
                    data-bs-toggle="tab"
                    href="#recentPhotos"
                    role="tab"
                    aria-controls="recentPhotos"
                    aria-selected={activeTab === "recentPhotos"}
                  >
                    Recent Photos
                  </a>
                </li>
                {currentUser && currentUser.id === user.id && (
                  <li className="nav-item">
                    <a
                      className={`nav-link text-uppercase ${activeTab === "myOrders" ? "active" : ""}`}
                      onClick={() => handleTabClick("myOrders")}
                      id="my-orders-tab"
                      data-bs-toggle="tab"
                      href="#myOrders"
                      role="tab"
                      aria-controls="myOrders"
                      aria-selected={activeTab === "myOrders"}
                    >
                      My Orders
                    </a>
                  </li>)}
              </ul>
              <div className="tab-content mb-5" id="myTabContent">
                <div className={`tab-pane fade ${activeTab === "recentPhotos" ? "active show" : ""}`} id="recentPhotos" role="tabpanel" aria-labelledby="recentPhotos-tab">
                  <div className="row g-2">
                    {images && images.length > 0 ? (
                      images.map((image) => (
                        <div key={image._id} className="col">
                          <ImagesCard
                            image={image}
                            currentUser={currentUser}
                            getUser={getUser}
                          />
                        </div>
                      ))
                    ) : (
                      <p>No images found for this user.</p>
                    )}
                  </div>
                </div>

                <div className={`tab-pane fade ${activeTab === "myOrders" ? "active show" : ""}`} id="orders" role="tabpanel" aria-labelledby="myOrders-tab">
                  <table className="mt-3" style={{ width: '100%' }}>
                    <thead className="myOrders-list-head">
                      <tr className="text-center">
                        <th>Nº</th>
                        <th>Order Name</th>
                        <th>Order Date</th>
                        <th>Order Status</th>
                      </tr>
                    </thead>
                    <tbody >
                      {orders.map((order) => (
                        <Fragment key={order._id}>
                          <tr className="order-item text-center" >
                            <td>{order.orderNumber}</td>
                            <td>
                              <button className="order-name-btn" onClick={() => handleOrderClick(order._id)} >
                                {order.orderName}
                              </button>
                            </td>
                            <td>{formatDate(order.date)}</td>
                            <td>{order.status}</td>
                          </tr>
                          {expandedOrderId === order._id && (
                            <tr >
                              <td colSpan="3">
                                <div className="expanded-user-order-details">
                                  <h5>Products:</h5>
                                  <ul >
                                    {order.items.map((item) => (


                                      <li key={item.product ? item.product._id : item.image._id}>
                                        Name: {item.product ? item.product.name : item.image.name}<br />
                                        Price: {item.product ? item.product.price : item.image.price}<br />
                                        Quantity: {item.quantity}<br />


                                      </li>

                                    )
                                    )}
                                  </ul>

                                </div>
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      ))
                      }
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

export default UserProfilePage;
