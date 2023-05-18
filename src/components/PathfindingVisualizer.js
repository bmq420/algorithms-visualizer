import React from "react";
import Node from "./node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import { bellmanford } from "../algorithms/bellmanford";
import { bruteForce } from "../algorithms/bruteforce";
import { branchAndBound } from "../algorithms/branchbound";

const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const END_NODE_ROW = 10;
const END_NODE_COL = 30;

export default function PathfindingVisualizer() {
    const [grid, setGrid] = React.useState([]);
    const [mouseIsPressed, setMouseIsPressed] = React.useState(false);
    const [algo, setAlgo] = React.useState(0);
    const [startCol, setStartCol] = React.useState(START_NODE_COL);
    const [startRow, setStartRow] = React.useState(START_NODE_ROW);
    const [endCol, setEndCol] = React.useState(END_NODE_COL);
    const [endRow, setEndRow] = React.useState(END_NODE_ROW);

    React.useEffect(() => {
        const newGrid = getInitialGrid();
        setGrid(newGrid);
    }, []);

    function getInitialGrid() {
        const grid = [];
        for (let row = 0; row < 20; row++) {
            const currentRow = [];
            for (let col = 0; col < 40; col++) {
                currentRow.push(createNode(col, row));
            }
            grid.push(currentRow);
        }
        return grid;
    }

    function handleMouseDown(row, col) {
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
        setMouseIsPressed(true);
    }

    function handleMouseEnter(row, col) {
        if (!mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
    }

    function handleMouseUp() {
        setMouseIsPressed(false);
    }

    function getNewGridWithWallToggled(grid, row, col) {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
            ...node,
            isWall: !node.isWall,
        };
        newGrid[row][col] = newNode;
        return newGrid;
    }

    function createNode(col, row) {
        return {
            col,
            row,
            isStart: row === startRow && col === startCol,
            isEnd: row === endRow && col === endCol,
            distance: Infinity,
            isVisited: false,
            isWall: false,
            previousNode: null,
        };
    }

    function visualize() {
        if (algo === "1") {
            visualizeDijkstra();
        } else if (algo === "2") {
            visualizeBellmanFord();
        } else if (algo === "3") {
            visualizeBranchAndBound();
        } else if (algo === "4") {
            visualizeBruteForce();
        }
    }

    // Dijkstra algorithm
    function visualizeDijkstra() {
        console.log(dijkstra);
        const startNode = grid[startRow][startCol];
        const endNode = grid[endRow][endCol];
        const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
        animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    function animateDijkstra(visitedNodeInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodeInOrder.length; i++) {
            if (i === visitedNodeInOrder.length) {
                setTimeout(() => {
                    animateShortestPath(nodesInShortestPathOrder);
                }, 20 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodeInOrder[i];
                document.getElementById(
                    `node-${node.row}-${node.col}`
                ).className = "node node-visited";
            }, 20 * i);
        }
    }

    // bellman-ford algorithm
    function visualizeBellmanFord() {
        const startNode = grid[startRow][startCol];
        const endNode = grid[endRow][endCol];
        const visitedNodesInOrder = bellmanford(grid, startNode, endNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
        animateBellmanFord(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    function animateBellmanFord(visitedNodeInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodeInOrder.length; i++) {
            if (i === visitedNodeInOrder.length) {
                setTimeout(() => {
                    animateShortestPath(nodesInShortestPathOrder);
                }, 20 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodeInOrder[i];
                document.getElementById(
                    `node-${node.row}-${node.col}`
                ).className = "node node-visited";
            }, 20 * i);
        }
    }

    //brute force algorithm
    function visualizeBruteForce() {
        console.log("brute force");
        const startNode = grid[startRow][startCol];
        const endNode = grid[endRow][endCol];
        const visitedNodesInOrder = bruteForce(grid, startNode, endNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
        animateBruteForce(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    function animateBruteForce(visitedNodeInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodeInOrder.length; i++) {
            if (i === visitedNodeInOrder.length) {
                setTimeout(() => {
                    animateShortestPath(nodesInShortestPathOrder);
                }, 20 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodeInOrder[i];
                document.getElementById(
                    `node-${node.row}-${node.col}`
                ).className = "node node-visited";
            }, 20 * i);
        }
    }

    // branch and bound algorithm
    function visualizeBranchAndBound() {
        const startNode = grid[startRow][startCol];
        const endNode = grid[endRow][endCol];
        const visitedNodesInOrder = branchAndBound(grid, startNode, endNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
        animateBranchAndBound(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    function animateBranchAndBound(
        visitedNodeInOrder,
        nodesInShortestPathOrder
    ) {
        for (let i = 0; i <= visitedNodeInOrder.length; i++) {
            if (i === visitedNodeInOrder.length) {
                setTimeout(() => {
                    animateShortestPath(nodesInShortestPathOrder);
                }, 20 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodeInOrder[i];
                document.getElementById(
                    `node-${node.row}-${node.col}`
                ).className = "node node-visited";
            }, 20 * i);
        }
    }

    function animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(
                    `node-${node.row}-${node.col}`
                ).className = "node node-shortest-path";
            }, 50 * i);
        }
    }

    function resetField() {
        console.log("reset");
        const newGrid = getInitialGrid();
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 40; col++) {
                if (row === START_NODE_ROW && col === START_NODE_COL) {
                    document.getElementById(`node-${row}-${col}`).className =
                        "node node-start";
                    continue;
                } else if (row === END_NODE_ROW && col === END_NODE_COL) {
                    document.getElementById(`node-${row}-${col}`).className =
                        "node node-finish";
                    continue;
                } else {
                    document.getElementById(`node-${row}-${col}`).className =
                        "node";
                }
            }
        }
        setStartRow(START_NODE_ROW);
        setStartCol(START_NODE_COL);
        setEndRow(END_NODE_ROW);
        setEndCol(END_NODE_COL);
        setGrid(newGrid);
    }

    function handleAlgo(event) {
        setAlgo(event.target.value);
    }

    function handleStartingCol(event) {
        setStartCol(event.target.value);
    }

    function handleStartingRow(event) {
        setStartRow(event.target.value);
    }

    function handleEndingCol(event) {
        setEndCol(event.target.value);
    }

    function handleEndingRow(event) {
        setEndRow(event.target.value);
    }

    function changePosition() {
        const newGrid = getInitialGrid();
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 40; col++) {
                if (row === Number(startRow) && col === Number(startCol)) {
                    document.getElementById(`node-${row}-${col}`).className =
                        "node node-start";
                    continue;
                } else if (row === Number(endRow) && col === Number(endCol)) {
                    document.getElementById(`node-${row}-${col}`).className =
                        "node node-finish";
                    continue;
                } else {
                    document.getElementById(`node-${row}-${col}`).className =
                        "node";
                }
            }
        }
        setGrid(newGrid);
    }

    return (
        <div className="app">
            <div className="navbar">
                <p>ALGORITHMS VISUALIZER</p>
                <select name="select-algo" onChange={handleAlgo}>
                    <option value={0} className="select-option">
                        --CHOOSE AN ALGORITHM
                    </option>
                    <option value={1} className="select-option dijkstra">
                        DIJKSTRA
                    </option>
                    <option value={2} className="select-option bellman-ford">
                        BELLMAN-FORD
                    </option>
                    <option
                        value={3}
                        className="select-option branch-and-bound"
                    >
                        BRANCH AND BOUND
                    </option>
                    <option value={4} className="select-option brute-force">
                        BRUTE FORCE
                    </option>
                </select>
                <div className="button visualize" onClick={visualize}>
                    VISUALIZE
                </div>
                <div className="button reset" onClick={resetField}>
                    RESET
                </div>
            </div>
            <div className="field">
                <div className="input-field">
                    <label>
                        <p>Starting's column: </p>
                        <input
                            type="text"
                            placeholder="0 - 39"
                            onChange={handleStartingCol}
                        />
                    </label>
                    <label>
                        <p>Starting's row: </p>
                        <input
                            type="text"
                            placeholder="0 - 19"
                            onChange={handleStartingRow}
                        />
                    </label>
                    <label>
                        <p>Ending's column: </p>
                        <input
                            type="text"
                            placeholder="0 - 39"
                            onChange={handleEndingCol}
                        />
                    </label>
                    <label>
                        <p>Ending's row: </p>
                        <input
                            type="text"
                            placeholder="0 - 19"
                            onChange={handleEndingRow}
                        />
                    </label>
                    <button onClick={changePosition}>SUBMIT</button>
                </div>
                <div className="inner-field">
                    <div className="inner-field-board">
                        {grid.map((row, rowIdx) => {
                            return (
                                <div key={rowIdx}>
                                    {row.map((node, nodeIdx) => {
                                        const {
                                            row,
                                            col,
                                            isStart,
                                            isEnd,
                                            isWall,
                                            distance,
                                            isVisited,
                                            previousNode,
                                        } = node;
                                        return (
                                            <Node
                                                key={nodeIdx}
                                                col={col}
                                                row={row}
                                                isStart={isStart}
                                                isEnd={isEnd}
                                                isWall={isWall}
                                                distance={distance}
                                                isVisited={isVisited}
                                                previousNode={previousNode}
                                                onMouseDown={(row, col) =>
                                                    handleMouseDown(row, col)
                                                }
                                                onMouseEnter={(row, col) =>
                                                    handleMouseEnter(row, col)
                                                }
                                                onMouseUp={() =>
                                                    handleMouseUp()
                                                }
                                            />
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
