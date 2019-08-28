import React from 'react';
import { CardComponent, TemplateResponse } from '../Components';
import { Link } from "react-router-dom";
import View from './View.jsx'
import './styles/listView.css'

export default class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.setTemplateData = this.setTemplateData.bind(this);
    this.handlePaginationDropdownChange = this.handlePaginationDropdownChange.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
    this.handlePrevPage = this.handlePrevPage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);

    this.state = {
      templateData: '',
      value: 20,
      currentPage: 1,
      templateNameValue: '',
      templateIdValue: '',
      teamNameValue: '',
      userIdValue: '',
    }

    // Handle showing template details
    window.addEventListener('displayTemplateDetails', (data) => {
      this.setTemplateData(data)
    });
  }

  setTemplateData(data) {
    this.setState({ templateData: data })
  }

  handlePaginationDropdownChange(event) {
    this.setState({ value: event.target.value }, () => {
      this.getList();
    });
  }

  handleNextPage() {
    let newPage = this.state.currentPage + 1;
    this.setState({ currentPage: newPage }, () => {
      this.getList();
    });
  }

  handlePrevPage() {
    if (this.state.currentPage > 1) {
      let newPage = this.state.currentPage - 1;
      this.setState({ currentPage: newPage }, () => {
        this.getList();
      });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSearchSubmit(event) {
    event.preventDefault();
    this.getList();
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
        "orderByColumn": "template_id",
        "searchBy": [{}]
      }
    }

    fetch('/api/templates/templatelist', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json()
      }

      )
      .then(json =>
        this.setState({ list: json.templateList })
      )


  }

  getList() {
    let dynamicData = {
      "user": {
        "userId": "1",
        "teamId": "1"
    },
      "pagination": {
        "pageNumber": this.state.currentPage,
        "recordPerPage": this.state.value,
        "orderByColumn": "template_id",
        "searchBy": [{}]
      }
    };

    console.log(this.state.list)

    if (this.state.templateNameValue !== '') {
      dynamicData.pagination.searchBy[0].template_name = this.state.templateNameValue;
    } if (this.state.templateIdValue !== '') {
      dynamicData.pagination.searchBy[0].template_id = this.state.templateIdValue;
    } if (this.state.teamNameValue !== '') {
      console.log(dynamicData.pagination.searchBy[0].team_name)
      console.log(this.state.teamNameValue)
      dynamicData.pagination.searchBy[0].team_name = this.state.teamNameValue;
    } if (this.state.userIdValue !== '') {
      dynamicData.pagination.searchBy[0].user_id = this.state.userIdValue;
    }

    console.log(dynamicData);
    console.log(this.state.list)

    fetch('/api/templates/templatelist', {
      method: "POST",
      body: JSON.stringify(dynamicData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => this.setState({ "list": json.templateList }))
  }

  render() {
    return (
      <div>
        <React.Fragment>
          <div className="search-bar-div">
            <form onSubmit={this.onSearchSubmit}>
              <label>Template Name  </label>
              <input type="text" id="template-name-search-bar" placeholder="Search" value={this.state.templateNameValue} name="templateNameValue" onChange={this.handleChange} />
              <label>Template ID  </label>
              <input type="text" id="template-id-search-bar" placeholder="Search" value={this.state.templateIdValue} name="templateIdValue" onChange={this.handleChange} />
              <label>Team Name  </label>
              <input type="text" id="team-search-bar" placeholder="Search" value={this.state.teamNameValue} name="teamNameValue" onChange={this.handleChange} />
              <label>User ID  </label>
              <input type="text" id="user-id-search-bar" placeholder="Search" value={this.state.userIdValue} name="userIdValue" onChange={this.handleChange} />
              <button type="submit">APPLY</button>
            </form>
          </div>
          <section className="component" name="card-component">
            <div className="create">
              <button id="create-template-btn">
                <Link to="/templates/create"><i id="create-template-icon" className="material-icons">control_point</i></Link>
                <Link to="/templates/create" id="create-template-link">Create new template</Link>
              </button>
            </div>
            {this.state.list
              ? this.state.list.map(item => {
                return (<CardComponent key={item.templateId} data={item} />)
              })
              : ''
            }
            <div className="template-list-footer">
              <label id="records-per-page">
                Records per page:
              </label>
              <div id="custom-select">
                <select id="records-per-page-select" value={this.state.value} onChange={this.handlePaginationDropdownChange}>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
              <span id="template-page-number">Page {this.state.currentPage}</span>
              <div id="pagination-btns">
                <button onClick={this.handlePrevPage} className="pagination-btn"><i className="material-icons md-13" id="pagination-back">arrow_back_ios</i></button>
                <button onClick={this.handleNextPage} className="pagination-btn"><i className="material-icons md-13" id="pagination-forward">arrow_forward_ios</i></button>
              </div>
            </div>
          </section>
        </React.Fragment>
        {this.state.templateData ? (<React.Fragment><TemplateResponse data="{this.state.templateData}" /> </React.Fragment>) : ''}
      </div >
    );
  }
}
