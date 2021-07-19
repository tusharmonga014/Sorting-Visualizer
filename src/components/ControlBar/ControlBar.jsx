import React, { Component } from "react";
import "./ControlBar.css";

class ControlBar extends Component {

  constructor(props) {
    super(props);
  }

  resetArray = (arraySize) => {
    this.props.generateArray(arraySize);
  }

  changeArraySize = (event) => {
    this.resetArray(event.target.value);
  }

  componentDidMount() {
    this.resetArray(100)
  }


  render() {
    const { array } = this.props;
    const arraySize = array.length;

    return (
      <div>
        <button className='generate-array-button'
          onClick={() => { this.resetArray(arraySize) }}>
          Generate New Array
        </button>
        <div className="separator"></div>
        <div>
          Array Size
        </div>
        <input
          className='array-size-range-button'
          type="range"
          min="10"
          max="200"
          defaultValue="100"
          onChange={this.changeArraySize}
        />
        <div className="separator"></div>
      </div>
    )
  }
}

export default ControlBar;