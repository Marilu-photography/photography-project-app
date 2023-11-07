import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import { deleteImage, likeCreate, likeDelete } from "../../services/ImagesServices";
import "./imagesCard.css";
import { PencilSquare, Trash3, Cart3, ArrowsFullscreen, HeartFill, Heart } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import ModalG from "../Modal/ModalG.jsx";
import { useRef } from "react";


const ImagesCard = ({ image, currentUser, getUser }) => {
  const { _id, name, price, images, author, editedImageUrl } = image;
  const [isLiked, setIsLiked] = useState(false)
  const { addItem } = useCart();
   const buttonRef = useRef(null);

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
  
  const handleLike = () => {
    if (image && !isLiked) {
      likeCreate(currentUser.id, image._id)
        .then(() => {
          setIsLiked(true);
          // Al dar "like", almacena el estado en el localStorage
          localStorage.setItem(`isLiked_${image._id}`, 'true');
        })
        .catch((error) => {
          console.error("Error liking image:", error);
        });
    } else {
      likeDelete(currentUser.id, image._id)
        .then(() => {
          setIsLiked(false);
          // Al quitar el "like", almacena el estado en el localStorage
          localStorage.setItem(`isLiked_${image._id}`, 'false');
        })
        .catch((error) => {
          console.error("Error unliking image:", error);
        });
    }
  }

  useEffect(() => {
    const localStorageLiked = localStorage.getItem(`isLiked_${image._id}`);
    if (localStorageLiked !== null) {
      setIsLiked(localStorageLiked === 'true');
    }
  }, [image._id]);


  return (
    <>

      <div className="card-photos">
        <div className="card-photo">
          <img src={images[0]} alt={name} className="card-img-top" />
        </div>
        <ul className="social-media-photo">
        <li>
                <button className="card-button-img like-btn" ref={buttonRef}  onClick={handleLike}>
                  {isLiked ? <HeartFill className="icon svg-icon" /> : <Heart className="icon svg-icon" /> }
                    
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
            <>
              <li>
                <button
                  className="card-button-img"
                  onClick={() => addItem({ ...image, id: image._id })}
                >
                  <Cart3 className="icon svg-icon" />
                </button>
              </li>
              <li>
                <ModalG image={image} />
              </li></>

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

