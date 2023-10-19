import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import { deleteImage } from "../../services/ImagesServices";
import "./imagesCard.css";
import { PencilSquare, Trash3, Cart3, ArrowsFullscreen } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import { useState } from "react";
import ModalG from "../Modal/ModalG.jsx";


const ImagesCard = ({ image, currentUser, getUser }) => {
  const { _id, name, price, images, author, editedImageUrl } = image;

  const { addItem } = useCart();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      deleteImage(image._id)
        .then(() => {
          getUser();
          console.log("Image deleted");
        })
        .catch((error) => {
          console.error("Error deleting image:", error);
        });
    }
  };

  return (
     <>
     
    <div className="card-photos">
      <div className="card-photo">
        <img src={images[0]} alt={name} className="card-img-top" />
      </div>
      <ul className="social-media-photo">        
      <li>
          <button
            className="card-button-img"
            onClick={() => addItem({ ...image, id: image._id })}
          >
            <Cart3 className="icon svg-icon" />
          </button>
        </li>
        {currentUser && currentUser.id === author.id ? (
          <>
            <li>
              <button className="card-button-img">
                <Link to={`/editor/${_id}`}>
                  <PencilSquare className="icon svg-icon" />
                </Link>
              </button>
            </li>
            <li>
              <button className="card-button-img">
                <Link onClick={handleDelete} to={`/profile/${author.id}`}>
                  <Trash3 className="icon svg-icon" />
                </Link>
              </button>
            </li>
          </>
        ) : (
          <li>
          <ModalG image={image}  />
          </li>
        )}
      </ul>
      <div className="card-info-photo">
        <p className="title-photo">{name}</p>
        <div className="info">
          <p className="subtitle-photo">
            Author: <strong><Link to={`/profile/${author.id}`}>{author.username}</Link></strong>
          </p>
          <p className="subtitle-photo"> Price: {price} €</p>
        </div>
      </div>
    </div>
    
  </>
);
};

export default ImagesCard;

