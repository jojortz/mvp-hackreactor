import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const modalStyle = {
  overlay:{
    position: 'fixed',
    inset: '0px',
    backgroundColor: 'rgba(234,236,233,0.4)',
},
  content:{
    backgroundColor:'rgba(234,236,233,0.1)',
    backdropFilter: 'blur(7px)',
    boxShadow: '0 6px 35px rgba(0,0,0,0.65)',
    borderRadius: '25px',
    borderColor: 'rgba(255, 255, 255,0.8)',
  }
}

const NewSessionModal = ({
  openModal,
  setOpenModal,
  handleNewSession
}) => {
  return (
    <Modal
      isOpen={openModal}
      ariaHideApp={false}
      style={modalStyle}
      id='new-session-modal-container'
    >
      <div id='qanda-modal-close-button'>
        <div
          onClick={(e) => {
            setOpenModal(!openModal);
          }}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </div>
      </div>

      <h3 id='qanda-modal-title' >New Session</h3>
      <form id='qanda-modal-content'>

      </form>
    </Modal>
  )
}

export default NewSessionModal;