import React from "react";
import Dropdown from "./dropdown.jsx";
import Button from "./button.jsx";
import TemplateBody from './templatebody.jsx';
import "./style.css";
import * as stubData from "./stubData.json";

export default class TemplateCreation extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props, stubData);
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    switch(evt.target.value) {
      case 'alpha':
        this.setState({ 'config': {
          'method': 'GET',
          'url': 'https://www.walmart.com/globalnav/vanilla-fragments/mobile/get-all',
          'headers': {
            "Host": "www.walmart.com",
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0",
            "Accept": "application/json",
            "Accept-Language": "en-US,en;q=0.5",
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/json",
            "appReferer": "?tid=0&returnUrl=%2Fsearch%2F%3Fcat_id%3D0%26query%3Ddogs%2Bfood",
            "isExternal": "false",
            "Connection": "keep-alive",
            "Referer": "https://www.walmart.com/search/?cat_id=0&query=dogs+food",
            "TE": "Trailers"
          }
        } });
        break;
      case 'bravo':
        this.setState({ 'config': {
          'method': 'POST',
          'url': 'https://www.walmart.com/cp/api/logger',
          'headers': {
            "Host": "www.walmart.com",
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0",
            "Accept": "application/json",
            "Accept-Language": "en-US,en;q=0.5",
            "Accept-Encoding": "gzip, deflate, br",
            "Referer": "https://www.walmart.com/cp/back-to-college/8174172?athcpid=f56109ed-ca18-4f87-998c-cb662220d264&athpgid=athenaHomepage&athznid=athenaModuleZone&athmtid=AthenaPOVCarouselStory&athtvid=4&athena=true&athstid=CS011%7CCS041&athftid=P0000&athguid=466001f5-46cfa622-a11b7499a18a716",
            "Content-Type": "application/json",
            "Origin": "https://www.walmart.com",
            "Content-Length": "747",
            "Connection": "keep-alive",
            "TE": "Trailers"
          }
        } });
        break;
    }

    this.setState({'showTemplateBuilder': true})

  }

  handleSubmit(evt) {
    evt.preventDefault();
    console.log('[CALLS to save template]');
  }

  render() {
    return (
      <form>
        <section id="template-header">
          <input placeholder="Template Name *Required" required />
          <input placeholder="Template Description *Required" required />
        </section>
        <section id="template-config">
          <Dropdown name="service" data={stubData.service} />
          <Dropdown name="environment" data={stubData.environment} />
          <Dropdown name="configuration" onChange={this.handleChange} data={stubData.configuration} />
          <Dropdown name="configAPI" data={stubData.api} />
        </section>


        {this.state.showTemplateBuilder ?
        (
          <div>
            <section id="template-builderHeader">
              <input disabled placeholder={this.state.config.method} />
              <input placeholder={this.state.config.url} className="template-url" />
            </section>
            <TemplateBody header={this.state.config.headers}/>
          </div>
        ) : ''
        }
        <section id="template-button">
          <button onClick={this.handleSubmit} type="submit">Send</button>
        </section>
      </form>
    );
  }
}
