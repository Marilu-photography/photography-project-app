import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createImage } from '../../services/ImagesServices';
import { useAuthContext } from "../../contexts/AuthContext";
import './UploadModal.css';


function UploadModal({ show, onHide, getUser }) {
  const [formData, setFormData] = useState({
    images: [],
    name: '',
    price: '',
  });
  const { user: currentUser } = useAuthContext();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (event) => {
    const imageFile = event.target.files[0];
    setFormData({
      ...formData,
      images: [...formData.images, imageFile],
    }); console.log(formData);
  };

  const handleSubmit = () => {
    const formDataToSend = new FormData();

    formDataToSend.append('images', formData.images[0]);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('author', currentUser.id);

    createImage(formDataToSend)
      .then(response => {
        if (response) {
          onHide();
          getUser();
        }
      })
      .catch(error => {
        console.error(error);
      }
      );

  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Upload Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="images"
              onChange={handleImageUpload}

            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className='btn-close-img' onClick={onHide}>
          Close
        </Button>
        <Button className='btn-upload-img' onClick={handleSubmit}>
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UploadModal;
