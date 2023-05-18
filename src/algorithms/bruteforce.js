export function bruteForce(grid, startNode, endNode) {
    const visitedNodesInOrder = [];
    const queue = [startNode];

    while (queue.length > 0) {
        const node = queue.shift();
        if (node === endNode) {
            return visitedNodesInOrder;
        }

        if (node.isVisited || node.isWall) {
            continue;
        }

        node.isVisited = true;
        visitedNodesInOrder.push(node);

        const neighbors = getUnvisitedNeighbors(node, grid);
        for (const neighbor of neighbors) {
            neighbor.previousNode = node;
            queue.push(neighbor);
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
