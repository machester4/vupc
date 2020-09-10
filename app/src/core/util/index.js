import { desktopCapturer } from "electron";

export async function getStreamFromScreen(screenID) {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      mandatory: {
        chromeMediaSourceId: screenID,
        chromeMediaSource: "desktop",
        // maxWidth: 1280,
        // maxHeight: 800,
        minFrameRate: 30,
        maxFrameRate: 60,
      },
    },
  });
  return stream;
}

export async function getAllStreams() {
  const sources = await desktopCapturer.getSources({
    types: ["screen"],
  });
  return sources;
}

/**
 * Transform a screen location
 * from percentage to pixels
 * @param {number} x - The X Coordinate
 * @param {number} y - The X Coordinate
 * @param {object} size - The screen size
 * @param {number} size.width
 * @param {number} size.height
 * @typedef {Object} Point
 * @property {number} x - The X Coordinate
 * @property {number} y - The Y Coordinate
 * @returns {Point} - The location of the event
 */
export function transformFromPixelsToPercent(x, y, size) {
  const { width, height } = size;
  const percentX = parseFloat((x * 100) / width).toFixed(2);
  const percentY = parseFloat((y * 100) / height).toFixed(2);
  return { x: percentX, y: percentY };
}

/**
 * Transform a screen location
 * from percentage to pixels
 * @param {number} x - The X Coordinate
 * @param {number} y - The X Coordinate
 * @param {object} size - The screen size
 * @param {number} size.width
 * @param {number} size.height
 * @typedef {Object} Point
 * @property {number} x - The X Coordinate
 * @property {number} y - The Y Coordinate
 * @returns {Point} - The location of the event
 */
export function transformFromPercentToPixels(x, y, size) {
  const { width, height } = size;
  const pixelsX = parseFloat((x / 100) * width).toFixed(0);
  const pixelsY = parseFloat((y / 100) * height).toFixed(0);
  return { x: pixelsX, y: pixelsY };
}
