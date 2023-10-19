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

{/* // <div className="card">
//   <img src={images[0]} alt={name} className="card-img-top" />
//   <div className="card-body">

//     {currentUser && currentUser.id === author.id ? (
//       <>
//         <Link to={`/editor/${_id}`} className="btn btn-primary">
//           Edit
//         </Link>
//         <Link className="btnDetails" onClick={handleDelete} to={`/profile/${author.id}`}> Delete </Link>
//       </>
//     ) : (
//       <>

//         <h5 className="card-title">{name}</h5>
//         <p className="card-text">
//           Author: <Link to={`/profile/${author.id}`}>{author.username}</Link>
//         </p>
//         <p className="card-text">Price: {price} €</p>
//         <button className="btn btn-success">View</button>
//         <button
//           className="card-button"
//           onClick={() => addItem({ ...image, id: image._id })}
//         >
//           <svg className="svg-icon" viewBox="0 0 20 20">
//             <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
//             <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
//             <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
//           </svg>
//         </button>
//       </>
//     )}
//   </div>
// </div> */}
