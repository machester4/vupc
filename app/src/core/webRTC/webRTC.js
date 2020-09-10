import { webFrame } from "electron";
import Peer from "simple-peer";
import { mouseClickEvent } from "../robot";
import {
  findOffer,
  generateOfferCode,
  waitAnswerSignal,
  tellToOfferSendSignal,
} from "../signaling";
import {
  getStreamFromScreen,
  transformFromPixelsToPercent,
  transformFromPercentToPixels,
} from "../util";

export async function createOffer(screenID) {
  try {
    const stream = await getStreamFromScreen(screenID);
    const peerConfig = {
      initiator: true,
      trickle: false,
      stream,
      // sdpTransform: setBandwidth,
      config: {
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      },
    };
    const p = new Peer(peerConfig);
    waitAnswerSignal((answer) => p.signal(answer));

    // Return observer for listen connection events
    const facade = {
      onConnect(callback) {
        p.on("connect", callback);
      },
      onClose(callback) {
        p.on("close", callback);
      },
      onData(callback) {
        p.on("data", (data) => {
          // TODO improve system events
          const dataParsed = JSON.parse(data.toString("utf8"));
          if (dataParsed.click) {
            const { x, y } = dataParsed;
            const {
              availWidth: width,
              availHeight: height,
            } = webFrame.context.screen;
            const size = {
              width,
              height,
            };
            mouseClickEvent(transformFromPercentToPixels(x, y, size));
          } else {
            callback(dataParsed);
          }
        });
      },
      onCode(callback) {
        // Listen signaling events
        p.on("signal", async (data) => {
          if (data.type === "offer") {
            const code = await generateOfferCode(data);
            callback(code);
          }
        });
      },
      disconnect() {
        p.destroy();
      },
    };

    return facade;
  } catch (error) {
    throw new Error(error);
  }
}

export async function connectWithOffer(code) {
  try {
    const peerConfig = {
      initiator: false,
      trickle: false,
      // sdpTransform: setBandwidth,
      config: {
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      },
    };
    const offer = await findOffer(code);
    const p = new Peer(peerConfig);

    // Listen signaling events
    p.signal(offer);
    p.on("signal", async (data) => {
      if (data.type === "answer") {
        tellToOfferSendSignal(code, data);
      }
    });

    const facade = {
      mouseClick(x, y, size) {
        const event = {
          click: true,
          ...transformFromPixelsToPercent(x, y, size),
        };
        p.send(JSON.stringify(event));
      },
      onConnect(callback) {
        p.on("connect", callback);
      },
      onClose(callback) {
        p.on("close", callback);
      },
      onStream(callback) {
        p.on("stream", callback);
      },
      disconnect() {
        p.destroy();
      },
    };

    return facade;
  } catch (error) {
    throw new Error(error);
  }
}
