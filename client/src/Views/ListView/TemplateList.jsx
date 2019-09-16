import React from "react";
import { CardComponent } from "../../Components";
import { Link } from "react-router-dom";
import ListView from "./ListView.jsx";
import BulkAction from './BulkAction';
import '../styles/TemplateList.css';

class TemplateList extends ListView {
  constructor(props) {
    super(props);

    this.state = {
      executeButton:false,
      deleteButton:false,
      selectedTemplate: [],
      filtered: false,
      showModal: {execute: false, delete: false},
      requestPassed: false
    }
  }

 handleCheckbox = id => {
   if (this.state.selectedTemplate.includes(id)) {
     this.setState(prevState => ({selectedTemplate:prevState.selectedTemplate.filter(el => el !== id)}))
     console.log(this.state.selectedTemplate)
   } else {
      this.setState(state => {
        const selectedTemplate = [...state.selectedTemplate, id];
        console.log(selectedTemplate);
        return {
          selectedTemplate
        };
      });
    }
  };

  handleExecute = id => {
    let url= `/api/templates/execute?templateId=${this.state.selectedTemplate}`
    if(!this.state.selectedTemplate.length) {
      this.setState(state => {
        const selectedTemplate = [...state.selectedTemplate, id];
        console.log(selectedTemplate);
        return {
          selectedTemplate
        };
      }, () => {
          fetch(url, {
          method: "POST",
          body: JSON.stringify(this.state.selectedTemplate),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.text())
          .then(data => {
           // set notification message and reset selecleted Templates list
           // verify with chuck that we dont need to hold on to the users selections
            console.log(data)
          })
        });
    } else {
        fetch(url, {
          method: "POST",
          body: JSON.stringify(this.state.selectedTemplate),
          headers: { "Content-Type": "application/json" }
      })
        .then(response => response.text())
        .then(data => {
          console.log(data)
        })
    }   
  }

  handleDelete = event => {
    let url= `/api/templates/deleted?templateId=${this.state.selectedTemplate}`
      fetch(url, {
        method: "delete",
        body: JSON.stringify(this.state.selectedTemplate),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.text())
        .then(data => {
          console.log(data)
        })
  }

  handleFilterButton = () => {
      this.setState(prevState => {
        return {
          filtered: !prevState.filtered
        }
      }, () => this.getList(this.state.filtered))
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  }

  handleCloseModal = () => {
    this.setState({ showModal: false });
  }

  handleConfirmExecute = id => {
    this.handleExecute(id);
    this.handleCloseModal();
  }

  handleOpenModal = () => {
    if(this.state.executeButton){
      this.setState({showModal:{execute:true, delete:false}})
    } else if(this.state.deleteButton) {
      this.setState({showModal:{execute:false, delete:true}})
    }
  }
 
  handleCloseModal = () => {
    this.setState({ showModal: {execute:false, delete:false},
                    executeButton:false,
                    deleteButton:false
                  });
  }

  handleFirstClick = event => {
    if(event.target.getAttribute('name') === 'execute'){
      this.setState({executeButton:true},()=>{
        this.handleOpenModal()
      })
    } else if(event.target.name === 'delete'){
      this.setState({deleteButton:true},()=>{
        this.handleOpenModal()
      })
    }
  }

  handleConfirmExecute = (id) => {
    this.handleExecute(id);
    this.handleCloseModal();
  }

  handleConfirmDelete = () => {
    this.handleDelete();
    this.handleCloseModal();
  }

  componentDidMount() {
    let data = {
      "user": {
        "userId": "1",
        "teamId": "1"
    },
      "pagination": {
        "pageNumber": 1,
        "recordPerPage": 20,
        "searchBy": {}
      }
    };

    fetch("/api/templates/templatelist", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(json => {
        this.setState({ list: json.templateList });
      });
  }

  render() {
    let myBulkAction = this.state.selectedTemplate.length > 0 && 
    <BulkAction handleExecute={this.handleExecute} 
                handleDelete={this.handleDelete}
                handleOpenModal={this.handleOpenModal}
                handleCloseModal={this.handleCloseModal}
                handleConfirmExecute={this.handleConfirmExecute}
                handleConfirmDelete={this.handleConfirmDelete}
                handleFirstClick={this.handleFirstClick}
                state={this.state}/>

    let filterDisplay = this.state.filtered? "All Templates" : "My Templates"
    return (
      <div>
        <React.Fragment>
          <div className="search-bar-div">
            <form onSubmit={this.onSearchSubmit}>
              <label>Template Name </label>
              <input
                type="text"
                id="template-name-search-bar"
                placeholder="Search"
                value={this.state.templateNameValue}
                name="templateNameValue"
                onChange={this.handleChange}
              />
              <label>Template ID </label>
              <input
                type="text"
                id="template-id-search-bar"
                placeholder="Search"
                value={this.state.templateIdValue}
                name="templateIdValue"
                onChange={this.handleChange}
              />
              <label>Team Name </label>
              <input
                type="text"
                id="team-search-bar"
                placeholder="Search"
                value={this.state.teamNameValue}
                name="teamNameValue"
                onChange={this.handleChange}
              />
              <label>User ID </label>
              <input
                type="text"
                id="user-id-search-bar"
                placeholder="Search"
                value={this.state.userIdValue}
                name="userIdValue"
                onChange={this.handleChange}
              />
              <button type="submit">APPLY</button>
            </form>
          </div>
          <section className="component" name="card-component">
            <div>
              {myBulkAction}
            </div>
            <div className="filterTemplates">
              <button onClick={this.handleFilterButton}>{filterDisplay}</button>
            </div>
            <div className="create">
              <button id="create-template-btn">
                <Link to="/templates/create">
                  <i id="create-template-icon" className="material-icons">
                    control_point
                  </i>
                </Link>
                <Link to="/templates/create" id="create-template-link">
                  Create new template
                </Link>
              </button>
            </div>
            {this.state.list?
              this.state.list.map(item => {
                return (<CardComponent
                           key={item.templateId}
                           data={item}
                           handleExecute={this.handleExecute}
                           handleCheckbox={this.handleCheckbox}
                           handleDelete={this.handleDelete}
                           handleFirstClick={this.handleFirstClick}
                           handleCloseModal={this.handleCloseModal}
                           handleOpenModal={this.handleOpenModal}
                           handleConfirmDelete={this.handleConfirmDelete}
                           handleConfirmExecute={this.handleConfirmExecute}
                           state={this.state}
                       />)
              })
              : ''
            }
            <div className="template-list-footer">
              <label id="records-per-page">Records per page:</label>
              <div id="custom-select">
                <select
                  id="records-per-page-select"
                  value={this.state.value}
                  onChange={this.handlePaginationDropdownChange}
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
              <span id="template-page-number">
                Page {this.state.currentPage}
              </span>
              <div id="pagination-btns">
                <button
                  onClick={this.handlePrevPage}
                  className="pagination-btn"
                >
                  <i className="material-icons md-13" id="pagination-back">
                    arrow_back_ios
                  </i>
                </button>
                <button
                  onClick={this.handleNextPage}
                  className="pagination-btn" >
                  <i className="material-icons md-13" id="pagination-forward">
                    arrow_forward_ios
                  </i>
                </button>
              </div>
            </div>
          </section>
        </React.Fragment>
      </div>
    );
  }
}

export default TemplateList;
