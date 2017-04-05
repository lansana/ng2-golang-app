export function port () {
    const port: string = window.location.port;
    let serverPort: string;

    // Running dev server, server is hosted on another port
    if (port.indexOf("4200") > -1) {
        serverPort = ":80"; // Whatever port Go server is running on, or container port
    } else {
        serverPort = ":" + port || "80";
    }

    return serverPort;
}
