import React, { Component } from "react";
import { DEFAULT_ARRAY_SIZE, DEFAULT_SELECTED_SPEED, MAX_ARRAY_SIZE, MIN_ARRAY_SIZE, SORTING_SPEED_UPPER_LIMIT } from "../../defaults";
import "./ControlBar.css";

class ControlBar extends Component {

  resetArray = (arraySize) => {
    this.props.generateArray(arraySize);
  }

  changeArraySize = (event) => {
    this.resetArray(event.target.value);
  }

  /**
   * Returns the algorithm name in Title Case
   * @param {*} algorithm The algorithm whose name is to be returned in Title Case
   * @returns Algorithm name in Title Case
   */
  getAlgorithmNameInTitleCase = (algorithm) => {
    switch (algorithm) {
      case 'BUBBLE_SORT': return 'Bubble Sort';
      case 'MERGE_SORT': return 'Merge Sort';
      case 'QUICK_SORT': return 'Quick Sort';
      default: {
        console.error('No algorithm provided for conversion to title case');
      }
    }
  }

  changeAlgorithm = (event) => {
    const selectedAlgo = event.target.value;
    this.props.changeAlgorithm(selectedAlgo);
    const selectedAlgoTitleCase = this.getAlgorithmNameInTitleCase(selectedAlgo);
    document.getElementById("dropdown-algo-selector").innerText = selectedAlgoTitleCase;
  }

  changeSpeed = (event) => {
    const selectedSpeed = (Number)(event.target.value);
    this.props.changeSpeed(selectedSpeed);
  }

  startSorting = () => {
    this.props.sort();
  }

  componentDidMount() {
    this.resetArray(DEFAULT_ARRAY_SIZE);
  }


  render() {
    const { array } = this.props;
    const arraySize = array.length;

    return (
      <div className='nav navbar navbar-dark bg-dark text-center'>
        <div className='navbar navbar-brand col-3 text-center m-0 p-0'>
          <h2>SORTING VISUALIZER</h2>
        </div>

        <div className="col-3  text-center">
          <button className='generate-array-button btn btn-white btn-round m-1 mr-2'
            onClick={() => { this.resetArray(arraySize) }}>
            Generate New Array
          </button>

          <div className="btn-group">
            <button type="button" id="dropdown-algo-selector" className="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Bubble Sort
            </button>
            <div className="dropdown-menu">
              <button className="dropdown-item" value='BUBBLE_SORT' onClick={this.changeAlgorithm}>Bubble Sort</button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" value='MERGE_SORT' onClick={this.changeAlgorithm}>Merge Sort</button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" value='QUICK_SORT' onClick={this.changeAlgorithm}>Quick Sort</button>
            </div>
          </div>
        </div>

        <div className="col-2 text-center row">
          <div className='text-white col-12'>Array Size</div>
          <div className='text-white col-12'>Sorting Speed</div>
          <div className='col-3 text-right'></div>
        </div>

        <div className='col-2 row'>
          <input
            className='array-size-range-button mb-1'
            type="range"
            min={MIN_ARRAY_SIZE}
            max={MAX_ARRAY_SIZE}
            defaultValue={DEFAULT_ARRAY_SIZE}
            onChange={this.changeArraySize}
          />

          <input
            className='sorting-speed-range-button mt-1'
            type="range"
            min="1"
            max={SORTING_SPEED_UPPER_LIMIT}
            defaultValue={DEFAULT_SELECTED_SPEED}
            onChange={this.changeSpeed}
          />
        </div>

        <button
          className="btn btn-success mr-4 col-2"
          onClick={this.startSorting}
        >
          START SORTING
        </button>

      </div>
    )
  }
}

export default ControlBar;