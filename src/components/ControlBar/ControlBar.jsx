import React, { Component } from "react";
import { DEFAULT_ARRAY_SIZE, DEFAULT_SELECTED_ALGORITHM, DEFAULT_SELECTED_SPEED, MAX_ARRAY_SIZE, MIN_ARRAY_SIZE, SORTING_SPEED_UPPER_LIMIT } from "../../defaults";
import "./ControlBar.css";

class ControlBar extends Component {

  /**
   * Generates a new Array of given length
   * @param {number} arraySize length for new Array
   */
  resetArray = (arraySize) => {
    this.props.generateArray(arraySize);
  }

  /**
   * Changes and generates a new array of selected length
   * @param {event} event Event which trigerred the function
   */
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
      case 'HEAP_SORT': return 'Heap Sort';
      default: {
        console.error('No algorithm provided for conversion to title case');
      }
    }
  }

  /**
   * Changes the algorithm 
   * @param {event} event Event which trigerred the function
   */
  changeAlgorithm = (event) => {
    const selectedAlgo = event.target.value;
    this.props.changeAlgorithm(selectedAlgo);
    const selectedAlgoTitleCase = this.getAlgorithmNameInTitleCase(selectedAlgo);
    document.getElementById("dropdown-algo-selector").innerText = selectedAlgoTitleCase;
  }

  /**
  * Changes the algorithm 
  * @param {event} event Event which trigerred the function
  */
  changeSpeed = (event) => {
    const selectedSpeed = (Number)(event.target.value);
    this.props.changeSpeed(selectedSpeed);
  }

  /**
   * Disables the control bar inputs for 
   * Array and Algorithm slelection
   */
  disableArrayAlgorithmInputs = () => {
    const buttonsToBeDisabled = document.getElementsByClassName('input-disable-when-running');
    for (let buttonDisablingIterator = 0; buttonDisablingIterator < buttonsToBeDisabled.length; buttonDisablingIterator++) {
      buttonsToBeDisabled[buttonDisablingIterator].setAttribute('disabled', true);
    }
  }

  /**
   * Disables the control bar's input-label-texts on the control bar
   */
  disableArrayAlgorithmTexts = () => {
    const textsToBeDisabled = document.getElementsByClassName('text-disable-when-running');
    for (let textDisablingIterator = 0; textDisablingIterator < textsToBeDisabled.length; textDisablingIterator++) {
      textsToBeDisabled[textDisablingIterator].classList.remove('text-white');
      textsToBeDisabled[textDisablingIterator].classList.add('text-muted');
    }
  }

  /**
   * Enables the control bar inputs for 
   * Array and Algorithm slelection
   */
  enableArrayAlgorithmInputs = () => {
    const buttonsToBeEnabled = document.getElementsByClassName('input-disable-when-running');
    for (let buttonEnablingIterator = 0; buttonEnablingIterator < buttonsToBeEnabled.length; buttonEnablingIterator++) {
      buttonsToBeEnabled[buttonEnablingIterator].removeAttribute('disabled');
    }
  }

  /**
   * Enables the control bar's input-label-texts on the control bar
   */
  enableArrayAlgorithmTexts = () => {
    const textsToBeEnabled = document.getElementsByClassName('text-disable-when-running');
    for (let textEnablingIterator = 0; textEnablingIterator < textsToBeEnabled.length; textEnablingIterator++) {
      textsToBeEnabled[textEnablingIterator].classList.remove('text-muted');
      textsToBeEnabled[textEnablingIterator].classList.add('text-white');
    }
  }

  /**
   * Hides start sort button on the control bar
   */
  hideStartSortingButton = () => {
    const startSortingButton = document.getElementById('btn-sort');
    startSortingButton.setAttribute('hidden', true);
  }

  /**
   * Shows start sort button on the control bar
   */
  showStartSortingButton = () => {
    const startSortingButton = document.getElementById('btn-sort');
    startSortingButton.removeAttribute('hidden');
  }

  /**
   * Shows pause button on the control bar
   */
  showPauseButton = () => {
    const pauseButton = document.getElementById('btn-pause');
    pauseButton.removeAttribute('hidden');
  }

  /**
   * Hides pause button on the control bar
   */
  hidePauseButton = () => {
    const pauseButton = document.getElementById('btn-pause');
    pauseButton.setAttribute('hidden', true);
  }

  /**
   * Shows continue button on the control bar
   */
  showContinueButton = () => {
    const continueButton = document.getElementById('btn-continue');
    continueButton.removeAttribute('hidden');
  }

  /**
   * Hides continue button on the control bar
   */
  hideContinueButton = () => {
    const continueButton = document.getElementById('btn-continue');
    continueButton.setAttribute('hidden', true);
  }

  /**
   * Shows the stop sort button on the control bar
   */
  showStopSortinButton = () => {
    const stopSortingButton = document.getElementById('btn-stop-sort');
    stopSortingButton.removeAttribute('hidden');
  }

  /**
   * Hides stop sort button on the control bar
   */
  hideStopSortingButton = () => {
    const stopSortingButton = document.getElementById('btn-stop-sort');
    stopSortingButton.setAttribute('hidden', true);
  }

  /**
   * Disables Array and Algorithm related features
   * and enables Sorting realted features
   */
  manageControlBarFeaturesWhenSortingStarts = () => {
    this.disableArrayAlgorithmInputs();
    this.disableArrayAlgorithmTexts();
    this.hideStartSortingButton();
    this.showPauseButton();
    this.showStopSortinButton();
  }

  /**
   * Enables Array and Algorithm related features
   * and enables Sorting realted features
   */
  manageControlBarFeaturesWhenSortingStops = () => {
    this.enableArrayAlgorithmInputs();
    this.enableArrayAlgorithmTexts();
    this.hidePauseButton();
    this.hideContinueButton();
    this.hideStopSortingButton();
    this.showStartSortingButton();
  }

  /**
   * Disables the control bar's feature 
   * and starts sorting
   */
  startSorting = () => {
    this.manageControlBarFeaturesWhenSortingStarts();
    this.props.startSorting();
  }

  /**
   * Pauses the sorting
   */
  pauseSorting = () => {
    this.props.pauseSorting();
    this.hidePauseButton();
    this.showContinueButton();
  }

  /**
   * Continues the paused sorting process
   */
  continueSorting = () => {
    this.hideContinueButton();
    this.showPauseButton();
    this.props.continueSorting();
  }

  /**
   * Stops the current storting process
   */
  stopSorting = () => {
    this.manageControlBarFeaturesWhenSortingStops();
    this.props.stopSorting();
  }

  /**
   * Checks if sorting is completed
   * and calls the required control
   * bar manager functions
   */
  handleIfSortingCompleted = () => {
    this.props.sortingRunStatus === 'COMPLETED' && this.manageControlBarFeaturesWhenSortingStops();
  }

  componentDidMount() {
    this.resetArray(DEFAULT_ARRAY_SIZE);
  }


  render() {
    const { array } = this.props;
    const arraySize = array.length;

    this.handleIfSortingCompleted();

    return (
      <div className='nav navbar navbar-dark bg-dark text-center p-2'>
        <div className='navbar navbar-brand col-sm-12 col-md-6 col-lg-4 text-center m-0 p-0'>
          <h2>SORTING VISUALIZER</h2>
        </div>

        <div className="col-sm-12 col-md-6 col-lg-3 text-justify-end m-0 p-0 array-algo-buttons">
          <button className='generate-array-button btn btn-white btn-round mt-1 mb-1 mr-2 input-disable-when-running'
            onClick={() => { this.resetArray(arraySize) }}>
            Generate New Array
          </button>

          <div className="btn-group">
            <button
              type="button"
              id="dropdown-algo-selector"
              className="btn btn-success dropdown-toggle input-disable-when-running"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              {this.getAlgorithmNameInTitleCase(DEFAULT_SELECTED_ALGORITHM)}
            </button>
            <div className="dropdown-menu">
              <h1 className="dropdown-header text-large">Select Algorithm</h1>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item"
                value='MERGE_SORT'
                onClick={this.changeAlgorithm}>
                Merge Sort
              </button>
              <div className="dropdown-divider"></div>
              <button
                className="dropdown-item"
                value='QUICK_SORT'
                onClick={this.changeAlgorithm}>
                Quick Sort
              </button>
              <div className="dropdown-divider"></div>
              <button
                className="dropdown-item"
                value='BUBBLE_SORT'
                onClick={this.changeAlgorithm}>
                Bubble Sort
              </button>
              <div className="dropdown-divider"></div>
              <button
                className="dropdown-item"
                value='HEAP_SORT'
                onClick={this.changeAlgorithm}>
                Heap Sort
              </button>
            </div>
          </div>
        </div>

        <div className='col-md-12 col-lg-3 row slider-controls text-justify-end'>
          <div className='text-white text-center text-disable-when-running slider-controls col-sm-4 col-md-6 col-lg-6 mt-1 mb-1'>
            Array Size :
          </div>
          <input
            className='input-disable-when-running text-center slider-controls slider-range col-sm-7 col-md-6 col-lg-6 mt-1 mb-1'
            type="range"
            min={MIN_ARRAY_SIZE}
            max={MAX_ARRAY_SIZE}
            defaultValue={DEFAULT_ARRAY_SIZE}
            onChange={this.changeArraySize}
          />
          <div className='text-white text-center text-disable-when-running slider-controls col-sm-4 col-md-6 col-lg-6 mb-1'>
            Sorting Speed :
          </div>
          <input
            className='input-disable-when-running text-center slider-controls slider-range col-sm-7 col-md-6 col-lg-6 mb-1'
            type="range"
            min="1"
            max={SORTING_SPEED_UPPER_LIMIT}
            defaultValue={DEFAULT_SELECTED_SPEED}
            onChange={this.changeSpeed}
          />
        </div>

        <div className="col-sm-12 col-md-12 col-lg-2 text-center mt-1 mb-1">
          <button
            id="btn-sort"
            className="btn btn-success"
            onClick={this.startSorting}>
            START SORTING
          </button>

          <button
            id="btn-pause"
            className="btn btn-default"
            onClick={this.pauseSorting}
            hidden>Pause
          </button>
          <button
            id="btn-continue"
            className="btn btn-default"
            onClick={this.continueSorting}
            hidden>Continue
          </button>
          <button
            id="btn-stop-sort"
            className="btn btn-danger"
            onClick={this.stopSorting}
            hidden>STOP
          </button>

        </div>

      </div>
    )
  }
}

export default ControlBar;