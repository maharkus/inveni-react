import data from "./data.json"
import {Dijkstra} from "./Dijkstra";

export const getPathstoRooms = (destination: {category: number, etage: number, room: number}) => {
    const dijkstra = new Dijkstra();
    const paths = data.buildings[destination.category].etage[destination.etage].paths;
    for(let i = 0; i < paths.length; i++) {
        dijkstra.addEdge(paths[i][0], paths[i][1], paths[i][2])
    }
    const startNode = 0;
    const endNote: any = data.buildings[destination.category].etage[destination.etage].rooms[destination.room][2];
    return dijkstra.dijkstra(startNode, endNote);

}
