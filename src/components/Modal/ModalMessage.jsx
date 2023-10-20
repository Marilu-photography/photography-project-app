import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import './ModalMessage.css'


const ModalMessage = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      show={props.show}
      onHide={props.onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         OnClick 📸
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Thank you for joining our OnClick community. 🎉</h4>
        <p>
          To activate your account and start enjoying all our services, please
          verify your email address. You simply need to click on the link we've
          sent you.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="modal-message-button" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalMessage;
