import io from "socket.io-client";

let socket = null;
const host = "http://localhost:4000";

export default (() => {
  if (!socket) {
    socket = io(host);
  }
  return socket;
})();
