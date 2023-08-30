import data from "./data.json"
import {Dijkstra} from "./Dijkstra";

export const getPathstoRooms = (destination: number[]) => {
    const dijkstra = new Dijkstra();
    const paths = data.buildings[destination[0]].paths;
    for(let i = 0; i < paths.length; i++) {
        console.log(paths[i][0] + " " +  paths[i][1] + " " +  paths[i][2])
        dijkstra.addEdge(paths[i][0], paths[i][1], paths[i][2])
    }
    const startNode = 0;
    console.log(destination[1])
    return dijkstra.dijkstra(startNode, destination[1]);

}
