export function bellmanford(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const nodes = getAllNodes(grid);

    for (let i = 0; i < nodes.length - 1; i++) {
        for (const node of nodes) {
            if (node.isWall) continue;
            if (node.distance === Infinity) continue;

            updateNeighbors(node, grid);
        }
    }

    for (const node of nodes) {
        if (node.isWall) continue;
        if (node.distance === Infinity) continue;
        if (updateNeighbors(node, grid)) {
            // Negative cycle found
            return null;
        }
    }
    return visitedNodesInOrder;
}

function updateNeighbors(node, grid) {
    const neighbors = getNeighbors(node, grid);
    let updated = false;

    for (const neighbor of neighbors) {
        if (neighbor.isWall) continue;
        const newDistance = node.distance + 1;

        if (newDistance < neighbor.distance) {
            neighbor.distance = newDistance;
            neighbor.previousNode = node;
            updated = true;
        }
    }

    return updated;
}

function getNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;

    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

    return neighbors;
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}
