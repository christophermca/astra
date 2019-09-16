import React from "react"
import Modal from 'react-modal';


const BulkAction = (props) => {
    let numOfTempsDisplayed = props.state.selectedTemplate.length > 1 ? 
    <p>{`${props.state.selectedTemplate.length} templates selected`}</p>
    :
    <p>{`${props.state.selectedTemplate.length} template selected`}</p>

    let numOfItems = props.state.selectedTemplate.length > 1 ? "these items?" : "this item?"
    return(
        <div className="bulkAction">
          <div>{numOfTempsDisplayed}</div>
          <button  style={{color:"rgb(0, 151, 219)"}}
                   onClick={props.handleFirstClick}
                   name="execute">Execute 
          </button>
       
            <Modal 
              isOpen={props.state.showModal.execute}>
                <h2>Confirm Execution!</h2>
                <button onClick={props.handleCloseModal}>Cancel</button>
                <button onClick={props.handleConfirmExecute}>Confirm</button>
            </Modal>
      
          <button>Create Suite</button>
           
          <button  style={{color:"red"}}
                   onClick={props.handleFirstClick}
                   name="delete">Delete 
          </button>
       
            <Modal 
              isOpen={props.state.showModal.delete}>
                <h2>{`Are you sure to delete ${numOfItems}`}</h2>
                <button onClick={props.handleCloseModal}>Cancel</button>
                <button onClick={props.handleConfirmDelete}>Delete</button>
            </Modal>
         
        </div>
    )
}


export default BulkAction;