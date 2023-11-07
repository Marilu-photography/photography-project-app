import "./ProductCardDetail.css";
import { useCart } from "react-use-cart";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { deleteProduct } from "../../services/ProductsServices";
import {
  listComments,
  deleteComment,
} from "../../services/CommentsServices";
import StarRating from "../StarRating/StarRating";
import ModalReview from "../Modal/ModalReview";
import { Trash3 } from "react-bootstrap-icons";




const ProductCardDetail = ({ product }) => {
  const {
    name,
    description,
    price,
    images,
    category,
    condition,
    cameraType,
    lensType,
    accessoryType,
    model,
    brand,
  } = product;

  const [isAdmin, setIsAdmin] = useState(false);
  const { user: currentUser } = useAuthContext();
  const [comments, setComments] = useState([]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    if (currentUser && currentUser.isAdmin !== undefined) {
      setIsAdmin(currentUser.isAdmin);
    }
  }, [currentUser]);

  useEffect(() => {
    listComments(product._id)
      .then((comments) => {
        setComments(comments);
      })
      .catch((error) => {
        console.error("Error listing comments:", error);
      });
  }, [product._id]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };



  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(product._id)
        .then(() => {
          console.log("Product deleted");
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
        });
    }
  };


  const handleCommentDelete = (commentId) => {
    deleteComment(commentId)
      .then(() => {
        const updateComments = comments.filter((comment) => {
          return comment.id !== commentId;
        });
        setComments(updateComments);
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
  };

  const { addItem } = useCart();

  if (!product) {
    console.error("Warning: 'product' prop is missing in ProductCard!");
    return null;
  }

  const handleUpdateComments = () => {
    listComments(product._id)
      .then((comments) => {
        setComments(comments);
      })
      .catch((error) => {
        console.error("Error listing comments:", error);
      });
  }

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const parts = formattedDate.split(' ');
    parts[1] = parts[1].toUpperCase(); 
    return parts.join(' ');
  };

  return (
    <>
      <div className="global-detail-container d-flex flex-column">
        <div className=" ProductCardDetail">
          <div className="row mb-3">
            <div className="col-lg-6 d-flex align-items-center flex-column img-product-container">
              <div className="img-product">
                <img src={images[currentImageIndex]} className="card-img-top-product" alt={name} />
              </div>
              <div className="thumbnails">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={name}
                    className={`thumbnail ${index === currentImageIndex ? "active" : ""}`}
                    onClick={() => handleThumbnailClick(index)}
                  />
                ))}

              </div>
            </div>
            <div className="col-lg-6">
              <div className="card-body">
                <h1 className="card-title name-detail">{name}</h1>
                <hr />
                <div className=" item-detail">
                  <p className="card-text price-detail">{price} €</p>

                  <button
                    className="CartBtn"
                    onClick={() => addItem({ ...product, id: product._id })}
                  >
                    <span className="IconContainer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 576 512"
                        fill="rgb(17, 17, 17)"
                        className="cart"
                      >
                        <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                      </svg>
                    </span>
                    <p className="text-detail">Add to Cart</p>
                  </button>
                </div>

                <ul className=" d-inline-block">
                  <li className="li-detail px-3 py-2 mb-1">
                    <strong>Category: </strong>
                    <span>{category}</span>
                  </li>
                  <li className="li-detail px-3 py-2 mb-1">
                    <strong>Condition: </strong>
                    <span>{condition}</span>
                  </li>

                  {cameraType !== null ? (
                    <li className="li-detail px-3 py-2 mb-1">
                      <strong>Camera type: </strong>
                      <span>{cameraType}</span>
                    </li>
                  ) : (
                    ""
                  )}
                  {lensType !== null ? (
                    <li className="li-detail px-3 py-2 mb-1">
                      <strong>Lens type: </strong>
                      <span>{lensType}</span>
                    </li>
                  ) : (
                    ""
                  )}
                  {model !== null ? (
                    <li className="li-detail px-3 py-2 mb-1">
                      <strong>Model: </strong>
                      <span>{model}</span>
                    </li>
                  ) : (
                    ""
                  )}
                  {category !== "Camera" && category !== "Lens" ? (
                    <>
                      <li className="d-inline-block li-detail px-3 py-2 mb-1">
                        <strong>Accessory type: </strong>
                        <span>{accessoryType}</span>
                      </li>
                    </>
                  ) : (
                    ""
                  )}
                  <>
                  {brand !== null ? (
                    <>
                  <li className="li-detail px-3 py-2 mb-1">
                    <strong>Brand: </strong>
                    <span>{brand}</span>
                  </li>
                  </>
                  ) : (
                    ""
                  )}
                  </>
                </ul>
                {isAdmin && (
                  <>
                    <div className="d-flex justify-content-center">
                      <Link
                        className="btnDetails"
                        to={`/edit-product/${product._id}`}
                      >
                        Edit
                      </Link>
                      <Link
                        className="btnDetails"
                        onClick={handleDelete}
                        to={"/"}
                      >
                        Delete
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="my-5 d-flex reviews-area ">
        <div className="description-box-container flex-column ">
          <div className="btn-detail">
            <ul className="nav nav-tabs border-0" role="tablist" id="myTab">
              <li className=" nav-item nav-btns ">
                <button
                  className={`nav-link text-uppercase ${activeTab === "description" ? "active" : ""
                    }`}
                  onClick={() => handleTabClick("description")}
                >
                  <strong>Descripción</strong>
                </button>
              </li>
              <li className="nav-item nav-btns">
                <button
                  className={`nav-link text-uppercase ${activeTab === "reviews" ? "active" : ""
                    }`}
                  onClick={() => handleTabClick("reviews")}
                >
                  <strong>Reviews</strong>
                </button>
              </li>
            </ul>

            <div className="tab-content">
              <div
                className={`tab-pane fade show p-style ${activeTab === "description" ? "active" : ""
                  }`}
                id="description"
              > <h5>{name}</h5>
                <p>{description}</p>
              </div>
              <div
                className={`tab-pane fade p-style ${activeTab === "reviews" ? "show active" : ""
                  }`}
                id="reviews"
              >

                <div className="comments-list p.">

                  {comments && comments
                    .sort((a, b) => { return new Date(b.date) - new Date(a.date); })
                    .map((comment) => (
                      <div key={comment.id} className="comment">
                        <div className="d-flex flex-row">
                          <img className="avatar-comment"
                            src={comment.user ? comment.user.avatar : ''}
                            alt={comment.user ? comment.user.username : ''}
                          />
                        </div>
                        <div className="d-flex flex-column">
                          <div className="star-rating">
                          <h6 className="user-comment-name">{comment.user ? comment.user.username : 'Unknown User'}</h6>
                          {currentUser && currentUser.id === comment.user.id && (
                            <button className="mx-3 btn-delete-post" onClick={() => handleCommentDelete(comment.id)}>
                              <Trash3 /> 
                            </button>
                          )}
                          <p className="date-comment">{formatDate(comment.date)}</p>
                            {[...Array(comment.score)].map((_, index) => (
                              <StarRating key={index} selected={true} />
                            ))}
                          </div>

                          <p className="message-comment mt-2">{comment.message}</p>
                          
                        </div>

                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          {currentUser && currentUser.id ? (
            <ModalReview product={product} handleUpdateComments={handleUpdateComments} />

          ) : (
            ""
          )}
        </div>
      </div>

    </>
  );
}

export default ProductCardDetail;


