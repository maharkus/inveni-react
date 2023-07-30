class PriorityQueue<T> {
    private elements: [number, T][] = [];

    enqueue(priority: number, element: T): void {
        this.elements.push([priority, element]);
        this.elements.sort((a, b) => a[0] - b[0]);
    }

    dequeue(): T | undefined {
        return this.elements.shift()?.[1];
    }

    isEmpty(): boolean {
        return this.elements.length === 0;
    }
}

export class Dijkstra {
    private graph: Map<number, Map<number, number>>;

    constructor() {
        this.graph = new Map();
    }

    addEdge(source: number, destination: number, weight: number): void {
        if (!this.graph.has(source)) {
            this.graph.set(source, new Map());
        }
        this.graph.get(source)?.set(destination, weight);
    }

    dijkstra(startNode: number, endNote: number): number[] {
        const distances = new Map<number, { distance: number; visitedNodes: number[] }>();
        const priorityQueue = new PriorityQueue<number>();

        distances.set(startNode, { distance: 0, visitedNodes: [startNode] });
        priorityQueue.enqueue(0, startNode);

        while (!priorityQueue.isEmpty()) {
            const current = priorityQueue.dequeue();

            if (current === undefined || distances.get(current)?.visitedNodes.length === 0) continue;

            const { distance, visitedNodes } = distances.get(current)!;

            const neighbors = this.graph.get(current);

            if (!neighbors) continue;

            for (const [neighbor, weight] of neighbors) {
                const totalDistance = distance + weight;
                if (!distances.has(neighbor) || totalDistance < distances.get(neighbor)!.distance) {
                    const visitedNodesCopy = [...visitedNodes, neighbor];
                    distances.set(neighbor, { distance: totalDistance, visitedNodes: visitedNodesCopy });
                    priorityQueue.enqueue(totalDistance, neighbor);
                }
            }
        }


        return distances.get(endNote).visitedNodes;
    }
}
