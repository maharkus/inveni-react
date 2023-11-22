class NodePriority<startNode> {
    private elements: [number, startNode][] = [];

    enqueue(priority: number, element: startNode): void {
        this.elements.push([priority, element]);
        this.elements.sort((a, b) => a[0] - b[0]);
    }

    dequeue(): startNode | undefined {
        return this.elements.shift()?.[1];
    }

    isEmpty(): boolean {
        return this.elements.length === 0;
    }
}

export class PathAlgorithm {
    private graph: Map<number, Map<number, number>>;

    constructor() {
        this.graph = new Map();
    }

    // Add Nodes to Algorithm
    addPath(source: number, destination: number, weight: number): void {
        this.graph.get(source)?.set(destination, weight);
    }

    dijkstra(startNode: number, endNote: number): number[] {
        const distances = new Map<number, { distance: number; nodesVisited: number[] }>();
        const nodePriority = new NodePriority<number>();

        distances.set(startNode, { distance: 0, nodesVisited: [startNode] });
        nodePriority.enqueue(0, startNode);

        while (!nodePriority.isEmpty()) {
            const current = nodePriority.dequeue();

            //Fallback for faulty data
            if (current === undefined || distances.get(current)?.nodesVisited.length === 0) continue;

            const { distance, nodesVisited } = distances.get(current)!;

            const neighbors = this.graph.get(current);

            // Go to next if no neighbors
            if (!neighbors) continue;

            // For each edge to neighboring nodes
            for (const [neighbor, weight] of neighbors) {
                const totalDistance = distance + weight;

                // If no neighbor found or if neighbor with smaller distance than total distance has been found
                if (!distances.has(neighbor) || totalDistance < distances.get(neighbor)!.distance) {
                    const visitedNodesCopy = [...nodesVisited, neighbor];
                    // Sort neighbors of the point to distance
                    distances.set(neighbor, { distance: totalDistance, nodesVisited: visitedNodesCopy });
                    nodePriority.enqueue(totalDistance, neighbor);
                }
            }
        }


        return distances.get(endNote).nodesVisited;
    }
}
