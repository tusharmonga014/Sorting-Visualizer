import React, { Component } from "react"
import { BAR_COLOUR_PIVOT, BAR_COLOUR_SORTED, BAR_COLOUR_WHILE_CHECKING, BAR__COLOUR_DEFAULT, MARGIN_BETWEEN_BARS, SCREEN_PERCENTAGE_TO_OCCUPY } from "../../defaults";
import "./ArrayBars.css";

class ArrayBars extends Component {

    getMarginBetweenBars = (arraySize) => {
        const marginBetween = MARGIN_BETWEEN_BARS(arraySize);
        return marginBetween;
    }

    getBarsDisplayAreaWidth = (arraySize) => {
        const screenWidth = window.screen.width;
        const barsDisplayAreaWidth = Math.floor(screenWidth * SCREEN_PERCENTAGE_TO_OCCUPY(arraySize));
        return barsDisplayAreaWidth;
    }

    getBarWidth = (arraySize, barsDisplayAreaWidth, marginBetween) => {
        const barWidth = (barsDisplayAreaWidth - (marginBetween * arraySize)) / arraySize;
        return barWidth;
    }

    showBarHeight = (event) => {
        /**
         * Obataining bar and its height display 
         * box id from the event
         */
        const barId = event.target.id;
        const barIdForHeightDisplay = 'bar' + barId;

        /**
         * Getting the HTML element through their ids
         */
        const bar = document.getElementById(barId);
        const barHeightDisplayBox = document.getElementById(barIdForHeightDisplay);

        /**
         * Opacity becomes 0.5 when mouse enters the bar,
         * Height Display Box becomes visible,
         * Z-index of box is set to 1 to bring it forward than bar
         */
        bar.style.opacity = 0.5;
        barHeightDisplayBox.removeAttribute('hidden');
        barHeightDisplayBox.style.zIndex = 1;
    }

    hideBarHeight = (event) => {
        /**
         * Obataining bar and its height display 
         * box id from the event
         */
        const barId = event.target.id;
        const barIdForHeightDisplay = 'bar' + barId;

        /**
         * Getting the HTML element through their ids
         */
        const bar = document.getElementById(barId);
        const barHeightDisplayBox = document.getElementById(barIdForHeightDisplay);

        /**
         * Opacity becomes normal when mouse leaves the bar,
         * Height Display Box again becomes hidden,
         * Z-index of box is again set to 0 to prevent its area
         * from stopping mouse over effect for its bar
         */
        bar.style.opacity = 1;
        barHeightDisplayBox.setAttribute('hidden', true);
        barHeightDisplayBox.style.zIndex = 0;
    }

    /**
     * Enables the control bar's input-label-texts
     */
    enableInputs = () => {
        const buttonsToBeEnabled = document.getElementsByClassName('input-disable-when-running');
        for (let buttonDisablingIterator = 0; buttonDisablingIterator < buttonsToBeEnabled.length; buttonDisablingIterator++) {
            buttonsToBeEnabled[buttonDisablingIterator].removeAttribute('disabled');
        }
    }

    /**
     * Enables the control bar's input-label-texts
     */
    enableTexts = () => {
        const textsToBeDisabled = document.getElementsByClassName('text-disable-when-running');
        for (let textDisablingIterator = 0; textDisablingIterator < textsToBeDisabled.length; textDisablingIterator++) {
            textsToBeDisabled[textDisablingIterator].classList.remove('text-muted');
            textsToBeDisabled[textDisablingIterator].classList.add('text-white');
        }
    }

    /**
     * Enables the control-bar buttons which were 
     * disabled when sorting started
     */
    enableControlbarFeaturesWhenArrayIsSorted = () => {
        const { array, sortedArray } = this.props;
        if (array.length === sortedArray.length) {
            this.enableInputs();
            this.enableTexts();
        }
    }

    render() {

        const { array, currentlyChecking, pivot, sortedArray } = this.props;

        const arraySize = array.length;
        const barsDisplayAreaWidth = this.getBarsDisplayAreaWidth(arraySize);
        const marginBetween = this.getMarginBetweenBars(arraySize);
        const barWidth = this.getBarWidth(arraySize, barsDisplayAreaWidth, marginBetween);
        const displayBarHeight = window.screen.width >= 500 && arraySize < 23 ? true : false;

        return (
            <div>
                <div className="bars" style={{ width: barsDisplayAreaWidth }}>
                    {
                        array.length > 0 && array.map((bar, idx) => {
                            let backgroundColor = currentlyChecking.includes(idx) ? BAR_COLOUR_WHILE_CHECKING : BAR__COLOUR_DEFAULT;
                            backgroundColor = idx === pivot ? BAR_COLOUR_PIVOT : backgroundColor;
                            backgroundColor = sortedArray.includes(idx) ? BAR_COLOUR_SORTED : backgroundColor;
                            const barIdForHeightDisplay = 'bar' + idx;
                            this.enableControlbarFeaturesWhenArrayIsSorted();

                            return (
                                <div key={idx}>

                                    {/* bar height display box */}
                                    <div
                                        id={barIdForHeightDisplay}
                                        className="bar-height-display"
                                        hidden>
                                        {bar}
                                    </div>

                                    {/* bar */}
                                    <div
                                        id={idx}
                                        className="bar"
                                        style={{ width: barWidth, height: bar, backgroundColor: backgroundColor, marginLeft: marginBetween }}
                                        onMouseOver={this.showBarHeight}
                                        onMouseLeave={this.hideBarHeight}>
                                        {displayBarHeight ? bar : ''}
                                    </div>

                                </div>
                            );
                        })
                    }
                </div >

                <div className='base-block bg-dark text-center'></div>

            </div >
        )
    }
}

export default ArrayBars;