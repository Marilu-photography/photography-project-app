import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createImage } from '../../services/ImagesServices';
import { useAuthContext } from "../../contexts/AuthContext";


function UploadModal({ show, onHide, getUser }) {
  const [formData, setFormData] = useState({
    imageUrl: null,
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
      imageUrl: imageFile,
    }); console.log(formData);
  };

  const handleSubmit = () => {
    const formDataToSend = new FormData();
    formDataToSend.append('imageUrl', formData.imageUrl);
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
              name="imageUrl"
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
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UploadModal;
