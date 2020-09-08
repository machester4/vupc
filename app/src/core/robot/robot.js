import { remote } from "electron";
const robot = remote.getGlobal("robot");

/**
 * Create mouse event in offer
 * @param {object} data
 * @property {number} data.x - The X Coordinate
 * @property {number} data.y - The Y Coordinate
 */
export function mouseClickEvent(data) {
  robot.moveMouse(data.x, data.y);
  robot.mouseToggle("up", "left");
  robot.mouseClick();
}
