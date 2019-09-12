import React from "react"
import Modal from 'react-modal';


const BulkAction = (props) => {
    let numOfTempsDisplayed = props.state.selectedTemplate.length > 1 ? 
    <p>{`${props.state.selectedTemplate.length} templates selected`}</p>
    :
    <p>{`${props.state.selectedTemplate.length} template selected`}</p>
    return(
        <div className="bulkAction">
          <div>{numOfTempsDisplayed}</div>
          <button  style={{color:"rgb(0, 151, 219)"}}
                   onClick={props.handleOpenModal}>Execute 
          </button>
          <Modal 
            isOpen={props.state.showModal}
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


export default BulkAction;