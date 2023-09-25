import React, {Component, useEffect, useRef, useState} from 'react';
import Canvas from 'react-native-canvas';
import {styles} from "../styles/styles";
import data from "../roomfinding/data.json";
import {getPathstoRooms} from "../roomfinding/Roomfinder";

interface Props  {
    building: number
    points: number[],
    currentFloor: number
}
export const NavPath = ({building, points, currentFloor}: Props) => {
    const canvas = useRef(null);

    useEffect(() => {
        console.log("heer")
        const coordinates =
            data.buildings[building].etage[currentFloor].points
        ;

        console.log(canvas)
        const ctx = canvas.current.getContext('2d');
        console.log(ctx)
        console.log(canvas)
        canvas.current.height = 1500;
        canvas.current.width = 1500;
        ctx.fillStyle = '#A4EB5D';


        // Funktion zum Zeichnen von Linien
        const drawLines = (coordinates) => {


            ctx.beginPath();
            ctx.moveTo(coordinates[0][0], coordinates[0][1]);

            for (let i = 0; i < points.length; i++) {
                ctx.lineTo(coordinates[points[i]][0], coordinates[points[i]][1]);
            }

            ctx.strokeStyle = 'black';
            ctx.lineWidth = 15;
            ctx.lineJoin = 'round';
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.moveTo(coordinates[0][0], coordinates[0][1]);
            for (let i = 0; i < points.length; i++) {
                ctx.lineTo(coordinates[points[i]][0], coordinates[points[i]][1]);
                console.log(coordinates[points[i]][0] + " " + coordinates[points[i]][1])
            }

            ctx.strokeStyle = '#A4EB5D';
            ctx.lineWidth = 11;
            ctx.lineJoin = 'round';
            ctx.stroke();
            ctx.closePath();

            canvas_arrow(ctx, coordinates[points[points.length-2]][0], coordinates[points[points.length-2]][1], coordinates[points[points.length-1]][0],coordinates[points[points.length-1]][1], 20)

            ctx.beginPath();
            ctx.moveTo(coordinates[points[points.length-2]][0], coordinates[points[points.length-2]][1]);
            ctx.lineTo(coordinates[points[points.length-1]][0],coordinates[points[points.length-1]][1]);
            ctx.strokeStyle = '#A4EB5D';
            ctx.lineWidth = 11;
            ctx.stroke();
            ctx.closePath();
        };

        drawLines(coordinates);
        drawStart(ctx, coordinates[points[0]][0], coordinates[points[0]][1])
        drawEnd(ctx, coordinates[points[0]][0], coordinates[points[0]][1])
        console.log(coordinates[points[0]][0])

    }, [currentFloor]);



        return (
            <Canvas style={styles.canvas}
                    ref={canvas}/>
        )
}
function canvas_arrow(context, fromx, fromy, tox, toy, r){
    let x_center = tox;
    let y_center = toy;

    let angle;
    let x;
    let y;

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
    context.closePath();
    context.stroke();

    context.fill();
}

const drawStart = (context, x, y) => {
    context.beginPath();
    context.arc(x, y, 16, 0, 2 * Math.PI);
    context.fillStyle = '#C28CFC';
    context.strokeStyle = 'black'; // Farbe der Linie
    context.lineWidth = 4; // Breite der Linie
    context.lineJoin = 'round';
    context.stroke();
    context.fill();
    context.closePath();
}

const drawEnd = (context, x, y) => {
    context.beginPath();
    context.arc(x, y, 16, 0, 2 * Math.PI);
    context.fillStyle = '#C28CFC';
    context.strokeStyle = 'black'; // Farbe der Linie
    context.lineWidth = 4; // Breite der Linie
    context.lineJoin = 'round';
    context.stroke();
    context.fill();
    context.closePath();
}
