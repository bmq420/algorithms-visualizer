import React from 'react'
import './Node.css'

export default function Node(props) {
    const {
        col,
        row,
        isStart,
        isEnd,
        isWall,
        onMouseDown,
        onMouseEnter,
        onMouseUp,
        distance,
        previousNode,
        isVisited
    } = props;

    const extraClassName = 
        isStart ? "node-start" : 
        (isEnd ? "node-finish" : 
        (isWall ? "node-wall" : 
        ""));

    return (
        <div 
            id = {`node-${row}-${col}`}
            className={`node ${extraClassName}`}
            onMouseDown={() => props.onMouseDown(row, col)}
            onMouseEnter={() => props.onMouseEnter(row, col)}
            onMouseUp={() => props.onMouseUp()} 
        >
        </div>
    )
}