import React from 'react'
import Modal from 'react-modal'

function AlertMsg({ showModal, handleCloseModal, modalText }) {

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
    };

    console.log("alert msg is");

  return (
    <Modal
    isOpen={showModal}
    onRequestClose={handleCloseModal}
    style={customStyles}
    ariaHideApp={false}
    >
      <h2>{modalText.title}</h2>
      <div>{modalText.body}</div>
      <div style={{justifyContent: 'center', alignContent:'center', display:'flex', marginTop: 10}}>
        <button className='button-20' style={{justifyContent: 'center'}} onClick={handleCloseModal}>Close</button>
      </div>
    </Modal>
  )
}

export default AlertMsg