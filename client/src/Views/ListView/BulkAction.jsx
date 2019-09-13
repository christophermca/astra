import React from "react"

const BulkAction = (props) => {
    return(
        <div className="bulkAction">
          <button  style={{color:"rgb(0, 151, 219)"}}
                   onClick={props.handleExecute}>Execute 
          </button>

          <button>Create Suite</button>
           
          <button  style={{color:"red"}}
                   onClick={props.handleDelete}>Delete 
          </button>
        </div>
    )
}


export default BulkAction;