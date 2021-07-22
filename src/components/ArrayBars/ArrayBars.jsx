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
        const barId = event.target.id;
        const barIdForHeightDisplay = 'bar' + barId;

        const bar = document.getElementById(barId);
        const barHeightDisplayBox = document.getElementById(barIdForHeightDisplay);

        bar.style.opacity = 0.5;
        barHeightDisplayBox.removeAttribute('hidden');
    }

    hideBarHeight = (event) => {
        const barId = event.target.id;
        const barIdForHeightDisplay = 'bar' + barId;

        const bar = document.getElementById(barId);
        const barHeightDisplayBox = document.getElementById(barIdForHeightDisplay);

        bar.style.opacity = 1;
        barHeightDisplayBox.setAttribute('hidden', true);
    }

    render() {

        const { array, currentlyChecking, pivot, sortedArray } = this.props;

        const arraySize = array.length;
        const barsDisplayAreaWidth = this.getBarsDisplayAreaWidth(arraySize);
        const marginBetween = this.getMarginBetweenBars(arraySize);
        const barWidth = this.getBarWidth(arraySize, barsDisplayAreaWidth, marginBetween);
        const displayBarHeight = arraySize < 23 ? true : false;

        return (
            <div>
                <div className="bars" style={{ width: barsDisplayAreaWidth }}>
                    {
                        array.length > 0 && array.map((bar, idx) => {
                            let backgroundColor = currentlyChecking.includes(idx) ? BAR_COLOUR_WHILE_CHECKING : BAR__COLOUR_DEFAULT;
                            backgroundColor = idx === pivot ? BAR_COLOUR_PIVOT : backgroundColor;
                            backgroundColor = sortedArray.includes(idx) ? BAR_COLOUR_SORTED : backgroundColor;
                            let barIdForHeightDisplay = 'bar' + idx;

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