import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import PostComment from '../Comments/PostComment';
import './ModalReview.css';


const ModalReview = ({product, handleUpdateComments}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const closeModalReview = () => {
    setShow(false);
  }

  return (
    <>
      <button className='post-btn' onClick={handleShow}>
        Post a Review
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Post a review</Modal.Title>
        </Modal.Header>
        <Modal.Body> <PostComment onCloseModalReview={closeModalReview} product={product} handleUpdateComments={handleUpdateComments}/>  </Modal.Body>
      </Modal>
    </>
  );
};


export default ModalReview; 