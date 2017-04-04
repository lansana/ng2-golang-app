import { port } from './port';

export const environment = {
  production: true,
  websocket_url: "ws://" + window.location.hostname + port() + "/ws",
  server_url: "http://" + window.location.hostname + port()
};
