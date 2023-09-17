import React, { Component } from 'react';
import Canvas from 'react-native-canvas';
import {styles} from "../styles/styles";
import data from "../roomfinding/data.json";

interface Props  {
    points: number[]
}
export class NavPath extends Component<Props> {

    handleCanvas = (canvas) => {
        const ctx = canvas.getContext('2d');
        canvas.height = 1500;
        canvas.width = 1500;
        ctx.fillStyle = 'purple';
        const coordinates =
            data.buildings[0].points
        ;


        // Funktion zum Zeichnen von Linien
        const drawLines = (coordinates) => {
            ctx.beginPath();
            ctx.moveTo(coordinates[0][0], coordinates[0][1]);

           for (let i = 0; i < this.props.points.length; i++) {
               ctx.lineTo(coordinates[this.props.points[i]][0], coordinates[this.props.points[i]][1]);
               console.log(coordinates[this.props.points[i]][0] + " " + coordinates[this.props.points[i]][1])
           }
            console.log(this.props.points)

            ctx.strokeStyle = 'blue'; // Farbe der Linie
            ctx.lineWidth = 2; // Breite der Linie
            ctx.stroke();
        };

        // Aufruf der Funktion mit den Koordinaten
        drawLines(coordinates);
    }
    render() {
        return (
            <Canvas style={styles.canvas} ref={this.handleCanvas}/>
        )
    }
}
