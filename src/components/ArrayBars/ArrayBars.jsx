import React, { Component } from "react";
import "./ArrayBars.css";

class ArrayBars extends Component {

    constructor(props) {
        super(props);
    }
    
    getMarginBetweenBars = (arraySize) => {
        const marginBetween = arraySize <= 10 ? 4 : arraySize <= 50 ? 2 : 1;
        return marginBetween;
    }
    
    getBarsDisplayAreaWidth = (arraySize) => {
        const screenWidth = window.screen.width;
        const perecntageScreenToOccupy = arraySize <= 10 ? 0.33 : arraySize <= 50 ? 0.50 : 0.66;
        const barsDisplayAreaWidth = Math.floor(screenWidth * perecntageScreenToOccupy);
        return barsDisplayAreaWidth;
    }

    getBarWidth = (arraySize, barsDisplayAreaWidth, marginBetween) => {
        const barWidth = (barsDisplayAreaWidth - (marginBetween * arraySize)) / arraySize;
        return barWidth;
    }

    render() {

        const { array } = this.props;

        const arraySize = array.length;
        const barsDisplayAreaWidth = this.getBarsDisplayAreaWidth(arraySize);
        const marginBetween = this.getMarginBetweenBars(arraySize);
        const barWidth = this.getBarWidth(arraySize, barsDisplayAreaWidth, marginBetween);
        const displayBarHeight = arraySize < 23 ? true : false;

        return (

            < div className="bars" style={{ width: barsDisplayAreaWidth }}>
                {
                    array.length > 0 && array.map((bar, idx) => {
                        return (
                            <div className="bar" style={{ width: barWidth, height: bar, marginLeft: (idx != 0 ? marginBetween : 0) }} key={idx}>
                                {displayBarHeight ? bar : ''}
                            </div>
                        );
                    })
                }
            </div >
        )
    }
}

export default ArrayBars;