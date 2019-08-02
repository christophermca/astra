import React from 'react';
import TestComponent  from '../_example_testComponent.jsx';
import './style.css'

/* This component has unique style */
export default class LMC extends React.Component {
  render() {
    return (
      <div id="l-m-c">
          <strong>Using the Test Component: </strong><TestComponent />
        <div>
          <strong>Using the Test Component again: </strong><TestComponent name="nemo"/>
        </div>
      </div>
    )
  }
}

