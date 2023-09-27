import data from "./data.json"
import {Dijkstra} from "./Dijkstra";

export const getPathstoRooms = (category: number, etage: number, endNode: number) => {
    const dijkstra = new Dijkstra();
    const paths = data.buildings[category].etage[etage].paths;
    for(let i = 0; i < paths.length; i++) {
        dijkstra.addEdge(paths[i][0], paths[i][1], paths[i][2])
    }
    const startNode = 0;
    return dijkstra.dijkstra(startNode, endNode);

}
