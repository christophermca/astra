import React from "react"
import Modal from 'react-modal';


const BulkCTA = (props) => {
    let numOfTempsDisplayed = props.selectedTemplate.length > 1 ?
    <p>{`${props.selectedTemplate.length} templates selected`}</p>
    :
    <p>{`${props.selectedTemplate.length} template selected`}</p>

    return(
        <div className="bulkAction">
          <div>{numOfTempsDisplayed}</div>
          <button  style={{color:"rgb(0, 151, 219)"}}
                   onClick={props.handleOpenModal}>Execute
          </button>
          <Modal
            isOpen={props.showModal}
            >
              <h2>Confirm Execution!</h2>
              <button onClick={props.handleCloseModal}>Cancel</button>
              <button onClick={props.handleConfirmExecute}>Confirm</button>
          </Modal>

          <button>Create Suite</button>

          <button  style={{color:"red"}}
                   onClick={props.handleDelete}>Delete
          </button>
        </div>
    )
}


export default BulkCTA;
