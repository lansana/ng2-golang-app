// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { port } from './port';

export const environment = {
  production: false,
  websocket_url: "ws://localhost" + port() + "/ws",
  server_url: "http://localhost" + port()
};
