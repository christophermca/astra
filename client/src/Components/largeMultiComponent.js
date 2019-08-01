import React from 'react';
import TestComponent  from './testComponent.js';

export default class LMC extends React.Component {
  render() {
    return (
      <div>
          <strong>Using the Test Component: </strong><TestComponent />
        <div>
          <strong>Using the Test Component again: </strong><TestComponent name="nemo"/>
        </div>
      </div>
    )
  }
}

