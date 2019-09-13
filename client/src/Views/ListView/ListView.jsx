import React, {Component} from 'react';

 class ListView extends Component {
  constructor(props) {
    super(props);
    this.handlePaginationDropdownChange = this.handlePaginationDropdownChange.bind(
      this
    );
    this.handleNextPage = this.handleNextPage.bind(this);
    this.handlePrevPage = this.handlePrevPage.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.getList = this.getList.bind(this);

    this.state = {};
  }


  onSearchSubmit(event) {
    event.preventDefault();
    this.getList();
  }

  getList(myTemplates=false) {
     let dynamicData = {
    "user": {
      "userId": "1",
      "teamId": "1"
    },
    "pagination": {
      "pageNumber": this.state.currentPage,
      "recordPerPage": this.state.value,
      "searchBy": {}
    }
    };


    if (myTemplates) {
      dynamicData.pagination.searchBy = dynamicData.user
    } else {
      const { templateNameValue, templateIdValue, teamNameValue, userIdValue } = this.state;
      if (templateNameValue) {
        dynamicData.pagination.searchBy.template_name = this.state.templateNameValue;
      } if (templateIdValue) {
        dynamicData.pagination.searchBy.template_id = this.state.templateIdValue;
      } if (teamNameValue) {
        dynamicData.pagination.searchBy.team_name = this.state.teamNameValue;
      } if (userIdValue) {
        dynamicData.pagination.searchBy.user_id = this.state.userIdValue;
      }
    }

    fetch("/api/templates/templatelist", {
      method: "POST",
      body: JSON.stringify(dynamicData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(({ templateList }) => this.setState({ list: templateList }));
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

  handlePaginationDropdownChange(event) {
    console.log("this is the event in my handlePagination :", event)
    this.setState({ value: event.target.value }, () => {
      this.getList();
    });
  }
}

export default ListView;
