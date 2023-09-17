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
        ctx.fillStyle = '#A4EB5D';
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

            ctx.strokeStyle = 'black'; // Farbe der Linie
            ctx.lineWidth = 15; // Breite der Linie
            ctx.lineJoin = 'round';
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.moveTo(coordinates[0][0], coordinates[0][1]);
            for (let i = 0; i < this.props.points.length; i++) {
                ctx.lineTo(coordinates[this.props.points[i]][0], coordinates[this.props.points[i]][1]);
                console.log(coordinates[this.props.points[i]][0] + " " + coordinates[this.props.points[i]][1])
            }
            console.log(this.props.points)

            ctx.strokeStyle = '#A4EB5D'; // Farbe der Linie
            ctx.lineWidth = 11; // Breite der Linie
            ctx.lineJoin = 'round';
            ctx.stroke();
            ctx.closePath();

            canvas_arrow(ctx, coordinates[this.props.points[this.props.points.length-2]][0], coordinates[this.props.points[this.props.points.length-2]][1], coordinates[this.props.points[this.props.points.length-1]][0],coordinates[this.props.points[this.props.points.length-1]][1], 20)
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
function canvas_arrow(context, fromx, fromy, tox, toy, r){
    var x_center = tox;
    var y_center = toy;

    var angle;
    var x;
    var y;

    context.beginPath();

    angle = Math.atan2(toy-fromy,tox-fromx)
    angle += (1/3)*(2*Math.PI)
    x = r*Math.cos(angle) + x_center;
    y = r*Math.sin(angle) + y_center;

    context.moveTo(x, y);

    angle += (1/3)*(2*Math.PI)
    x = r*Math.cos(angle) + x_center;
    y = r*Math.sin(angle) + y_center;

    context.lineTo(x, y);

    angle += (1/3)*(2*Math.PI)
    x = r*Math.cos(angle) + x_center;
    y = r*Math.sin(angle) + y_center;
    context.lineTo(x, y);

    angle += (1/3)*(2*Math.PI)
    x = r*Math.cos(angle) + x_center;
    y = r*Math.sin(angle) + y_center;
    context.lineTo(x, y);

    context.strokeStyle = '#000000';
    context.lineWidth = 4; // Breite der Linie
    context.lineJoin = 'round';
    context.stroke();
    context.closePath();

    context.fill();
}
