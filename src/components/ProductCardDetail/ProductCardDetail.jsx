import "./ProductCardDetail.css";
import { useCart } from "react-use-cart";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { deleteProduct } from "../../services/ProductsServices";
import {
  createComment,
  listComments,
  deleteComment,
} from "../../services/CommentsServices";

import { list } from "postcss";



const ProductCardDetail = ({ product }) => {
  const {
    name,
    description,
    price,
    image,
    category,
    condition,
    cameraType,
    lensType,
    accessoryType,
    model,
  } = product;

  const [isAdmin, setIsAdmin] = useState(false);
  const [show, setShow] = useState(false);
  const { user: currentUser } = useAuthContext();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    message: "",
    score: 0,
  });


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



  const handleButtonDescriptionClick = () => {
    setShow(!show);
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

  const handleCommentSubmit = () => {
    if (newComment.message.trim() !== "" && newComment.score >= 1 && newComment.score <= 5) {
      createComment(product._id, newComment)
        .then((comment) => {

          setNewComment({ message: "", score: 0 });
          listComments(product._id)
            .then((comments) => {
              setComments(comments);
            })
            .catch((error) => {
              console.error("Error listing comments:", error);
            });
          
        })
        .catch((error) => {
          console.error("Error creating comment:", error);
        });
    } else {
      console.error("Invalid comment.");
    }
  };

  const handleCommentChange = (event) => {
    const { name, value } = event.target;
    setNewComment({
      ...newComment,
      [name]: value,
    });
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



  return (
    <div className="container d-flex flex-column ">
      <div className=" ProductCardDetail">
        <div className="row mb-3">
          <div className="col-lg-6">
            <div className="img-product">
              <img src={image} className="card-img-top" alt={name} />
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
                {model !== null ? (
                  <li className="li-detail px-3 py-2 mb-1">
                    <strong>Model: </strong>
                    <span>{model}</span>
                  </li>
                ) : (
                  ""
                )}
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
              </ul>

              {category !== "Camera" && category !== "Lens" ? (
                <>
                  <ul>
                    <li className="d-inline-block li-detail px-3 py-2 mb-1">
                      <strong>Accessory type: </strong>
                      <span>{accessoryType}</span>
                    </li>
                  </ul>
                </>
              ) : (
                ""
              )}

              {/* <button className="card-button" onClick={() => addItem({...product, id: product._id})}>
            <svg className="svg-icon" viewBox="0 0 20 20">
              <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
              <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
              <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
            </svg>
          </button> */}

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
      <div className="d-flex flex-row">
        <div className=" btn-detail">
          <button
            className="btnDetails show-on-click"
            tabIndex={0}
            onClick={handleButtonDescriptionClick}
          >
            Description
          </button>
          <div className={`hidden-div ${show ? "show" : ""}`}>
            <p>{description}</p>
          </div>
        </div>
      </div>
      <div>
        <h5>Reviews</h5>
        <form>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={newComment.message}
              onChange={handleCommentChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="score">Score:</label>
            <input
              type="number"
              id="score"
              name="score"
              value={newComment.score}
              onChange={handleCommentChange}
              min="1"
              max="5"
              required
            />
          </div>
          <button type="button" onClick={handleCommentSubmit}>
            Submit Comment
          </button>
        </form>
        <div className="comments-list">

          {comments && comments
          .sort((a, b) => { return new Date(b.date) - new Date(a.date); })
          .map((comment) => (
            <div key={comment.id} className="comment">
              <img
                src={comment.user ? comment.user.avatar : ''}
                alt={comment.user ? comment.user.username : ''}
              />
              <p>{comment.user ? comment.user.username : 'Unknown User'}</p>
              <p>{comment.score}</p>
              <p>{comment.date}</p>
              <p>{comment.message}</p>
              {currentUser && currentUser.id === comment.user.id && (
                <button onClick={() => handleCommentDelete(comment.id)}>
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default ProductCardDetail;
