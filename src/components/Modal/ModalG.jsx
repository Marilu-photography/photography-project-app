import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {ArrowsFullscreen} from 'react-bootstrap-icons';
import './ModalG.css';

function ModalG({image}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <Button className="card-button-img" onClick={handleShow}>
      <ArrowsFullscreen className="icon svg-icon" />
      </Button>

<div className="modal-img-container"> 
      <Modal className='modal-g' show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body >
        <img src={image.images[0]} alt="image" className="card-img-top modal-img-preview" />
        </Modal.Body>
        
      </Modal>
      </div>
    </>
  );
}

export default ModalG;