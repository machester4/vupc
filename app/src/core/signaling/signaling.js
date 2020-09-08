import io from "socket.io-client";

let socket = null;
const host = "http://localhost:4000";

// Socket signaling events
const FIND_ANSWER_WITH_CODE = "answer-want-connect";
const GENERATE_OFFER_CODE = "assign-offer-code";
const ANSWER_WANT_OFFER_SIGNAL = "answer-want-offer-signal";
const ANSWER_SIGNAL = "answer-signal";

function createSocket() {
  if (!socket) {
    socket = io(host);
  }
}

export async function findOffer(code) {
  return new Promise((resolve, reject) => {
    // Connect to socket.io server
    createSocket();

    // Send signal for find offer with code
    socket.emit(FIND_ANSWER_WITH_CODE, code, (offer) => {
      if (offer) {
        resolve(offer);
      } else {
        reject("Not found offer with code " + code);
      }
    });
  });
}

export async function generateOfferCode(offerData) {
  return new Promise((resolve) => {
    // Connect to socket.io server
    createSocket();

    socket.emit(GENERATE_OFFER_CODE, offerData, (code) => {
      resolve(code);
    });
  });
}

export function waitAnswerSignal(callback) {
  // Connect to socket.io server
  createSocket();
  socket.on(ANSWER_SIGNAL, callback);
}

export function tellToOfferSendSignal(code, answerData) {
  // Connect to socket.io server
  createSocket();

  socket.emit(ANSWER_WANT_OFFER_SIGNAL, { code, answer: answerData });
}
