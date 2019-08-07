import React from 'react'
import '../styles/leftNav.css'

function Leftnav(props) {
  return (
      <div id="left-bar">
        <img width="75" height="62" alt="astra logo" src="/logo.png"/>
        <nav>
          <ul>
            <li> Templates </li>
            <li> Flows </li>
            <li> Suites </li>
            <li> Reports </li>
          </ul>
        </nav>
      </div>
  );
}

export default Leftnav;
