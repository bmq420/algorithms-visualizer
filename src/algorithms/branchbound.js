export function branchAndBound(grid, startNode, endNode) {
    const visitedNodesInOrder = [];
    const priorityQueue = new PriorityQueue();
    startNode.distance = 0;
    priorityQueue.enqueue(startNode);

    while (!priorityQueue.isEmpty()) {
        const currentNode = priorityQueue.dequeue();
        if (currentNode === endNode) {
            return visitedNodesInOrder;
        }

        if (currentNode.isVisited || currentNode.isWall) {
            continue;
        }

        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode);

        const neighbors = getUnvisitedNeighbors(currentNode, grid);
        for (const neighbor of neighbors) {
            const distanceToNeighbor = currentNode.distance + 1; // Assuming a constant edge weight of 1
            if (distanceToNeighbor < neighbor.distance) {
                neighbor.distance = distanceToNeighbor;
                neighbor.previousNode = currentNode;
                priorityQueue.enqueue(neighbor);
            }
        }
    }

    return visitedNodesInOrder;
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    const numRows = grid.length;
    const numCols = grid[0].length;

    if (row > 0) {
        neighbors.push(grid[row - 1][col]);
    }
    if (row < numRows - 1) {
        neighbors.push(grid[row + 1][col]);
    }
    if (col > 0) {
        neighbors.push(grid[row][col - 1]);
    }
    if (col < numCols - 1) {
        neighbors.push(grid[row][col + 1]);
    }

    return neighbors.filter((neighbor) => !neighbor.isVisited);
}

// Define the PriorityQueue class
class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(node) {
        this.queue.push(node);
        this.sort();
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.queue.shift();
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    sort() {
        this.queue.sort((a, b) => a.distance - b.distance);
    }
}
