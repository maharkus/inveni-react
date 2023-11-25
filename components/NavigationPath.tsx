import React, { useEffect, useRef } from "react";
import Canvas from "react-native-canvas";
import { customColors, styles } from "../styles/styles";
import data from "../roomfinding/data.json";
import { getPathstoRooms } from "../roomfinding/Roomfinder";

interface Props {
  destination: { category: number; etage: number; room: number };
  currentFloor: number;
}
export const NavPath = ({ destination, currentFloor }: Props) => {
  const canvas = useRef(null);

  useEffect(() => {
    const coordinates =
      data.buildings[destination.category].etage[currentFloor].points;
    let endNode: any = 0;
    let room =
      data.buildings[destination.category].etage[destination.etage].rooms[
        destination.room
      ];
    let roomCoords = [room[3], room[4]];

    if (currentFloor == destination.etage) {
      endNode =
        data.buildings[destination.category].etage[destination.etage].rooms[
          destination.room
        ][2];
    } else {
      endNode = data.buildings[destination.category].etage[currentFloor].stairs;
    }

    const points = getPathstoRooms(destination.category, currentFloor, endNode);

    const ctx = canvas.current.getContext("2d");
    canvas.current.height = 1500;
    canvas.current.width = 1500;
    ctx.fillStyle = customColors.green;

    const drawLine = (coordinates, color, width) => {
      ctx.lineTo(coordinates[0], coordinates[1]);
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.lineJoin = "round";
      ctx.stroke();
    };
    // Funktion zum Zeichnen von Linien
    const drawLines = (coordinates) => {
      ctx.beginPath();
      ctx.moveTo(coordinates[0][0], coordinates[0][1]);

      for (let i = 0; i < points.length; i++) {
        if (i != points.length - 1) {
          drawLine(
            [coordinates[points[i]][0], coordinates[points[i]][1]],
            customColors.dark,
            15
          );
          drawLine(
            [coordinates[points[i]][0], coordinates[points[i]][1]],
            customColors.green,
            11
          );
        } else {
          let xVec = coordinates[points[i]][0] - coordinates[points[i - 1]][0];

          const XCoord =
            currentFloor == destination.etage
              ? roomCoords[0]
              : coordinates[endNode][0];
          const YCoord =
            currentFloor == destination.etage
              ? roomCoords[1]
              : coordinates[endNode][1];

          if (xVec == 0) {
            drawLine(
              [coordinates[points[i]][0], YCoord],
              customColors.dark,
              15
            );
            drawLine([XCoord, YCoord], customColors.dark, 15);
            drawLine(
              [coordinates[points[i]][0], YCoord],
              customColors.green,
              11
            );
            drawLine([XCoord, YCoord], customColors.green, 11);
          } else {
            drawLine(
              [XCoord, coordinates[points[i]][1]],
              customColors.dark,
              15
            );
            drawLine([XCoord, YCoord], customColors.dark, 15);
            drawLine(
              [XCoord, coordinates[points[i]][1]],
              customColors.green,
              11
            );
            drawLine([XCoord, YCoord], customColors.green, 11);
          }
          currentFloor != destination.etage &&
            canvas_arrow(
              ctx,
              coordinates[points[i - 1]][0],
              YCoord,
              XCoord,
              YCoord,
              17
            );
        }
      }
    };

    drawLines(coordinates);
    drawStart(ctx, coordinates[points[0]][0], coordinates[points[0]][1]);
    currentFloor == destination.etage &&
      drawEnd(ctx, roomCoords[0], roomCoords[1]);
  }, [currentFloor]);

  return <Canvas style={styles.canvas} ref={canvas} />;
};
function canvas_arrow(context, fromx, fromy, tox, toy, r) {
  let x_center = tox;
  let y_center = toy;

  let angle;
  let x;
  let y;

  context.beginPath();

  angle = Math.atan2(toy - fromy, tox - fromx);
  angle += (1 / 3) * (2 * Math.PI);
  x = r * Math.cos(angle) + x_center;
  y = r * Math.sin(angle) + y_center;

  context.moveTo(x, y);

  angle += (1 / 3) * (2 * Math.PI);
  x = r * Math.cos(angle) + x_center;
  y = r * Math.sin(angle) + y_center;

  context.lineTo(x, y);

  angle += (1 / 3) * (2 * Math.PI);
  x = r * Math.cos(angle) + x_center;
  y = r * Math.sin(angle) + y_center;
  context.lineTo(x, y);

  angle += (1 / 3) * (2 * Math.PI);
  x = r * Math.cos(angle) + x_center;
  y = r * Math.sin(angle) + y_center;
  context.lineTo(x, y);

  context.strokeStyle = customColors.dark;
  context.lineWidth = 4; // Breite der Linie
  context.lineJoin = "round";
  context.closePath();
  context.stroke();

  context.fill();
}

const drawStart = (context, x, y) => {
  context.beginPath();
  context.arc(x, y, 16, 0, 2 * Math.PI);
  context.fillStyle = customColors.purple;
  context.strokeStyle = customColors.dark; // Farbe der Linie
  context.lineWidth = 4; // Breite der Linie
  context.lineJoin = "round";
  context.stroke();
  context.fill();
  context.closePath();
};

const drawEnd = (context, x, y) => {
  context.beginPath();
  context.arc(x, y, 16, 0, 2 * Math.PI);
  context.fillStyle = customColors.orange;
  context.strokeStyle = customColors.dark; // Farbe der Linie
  context.lineWidth = 4; // Breite der Linie
  context.lineJoin = "round";
  context.stroke();
  context.fill();
  context.closePath();
};
