import React from 'react';
import TestComponent  from './testComponent.js';

export default class LMC extends React.Component {
  render() {
    return (
      <div>
        <strong><span>Lets nest some templates</span></strong>
        <ul>
          <li>
            <strong>The Test Component: </strong><TestComponent />
          </li>
          <li>
            <strong>The Create_Title Component: </strong> Coming Soon!!!
          </li>
        </ul>
      </div>
    )
  }
}

