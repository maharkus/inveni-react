import data from "./data.json"
import {PathAlgorithm} from "./PathAlgorithm";

export const getPathstoRooms = (category: number, etage: number, endNode: number) => {
    const dijkstra = new PathAlgorithm();
    const paths = data.buildings[category].etage[etage].paths;
    for(let i = 0; i < paths.length; i++) {
        dijkstra.addPath(paths[i][0], paths[i][1], paths[i][2])
    }
    const startNode = 0;
    return dijkstra.dijkstra(startNode, endNode);

}
