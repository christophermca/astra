import React from 'react'
import './style.css'
import { Link } from "react-router-dom";

function Leftnav(props) {
  return (
      <div id="left-bar">
        <img width="75" height="62" alt="astra logo" src="/logo.png"/>
          <nav>
            <ul>
              <li>
                <Link to="/templates">Templates</Link>
              </li>
           </ul>
          </nav>
      </div>
  );
}

export default Leftnav;
