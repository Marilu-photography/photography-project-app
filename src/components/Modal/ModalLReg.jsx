import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import './ModalR.css';
import Login from '../../views/Login/Login';
import ModalR from './ModalR';



const ModalLReg = (props) => {
    const [show, setShow] = useState(false);
    const [showR, setShowR] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    return (
        <>
        <div onClick={handleShow}>
            </div>

            <Modal {...props} show={props.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login Here</Modal.Title>
                </Modal.Header>
                <Modal.Body> <Login /> 
                <p>Don't you have an account yet? <button>Register here</button></p> 
                </Modal.Body> 
            </Modal>
        </>
    );
};


export default ModalLReg; 