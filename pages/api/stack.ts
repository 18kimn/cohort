import { NextApiRequest, NextApiResponse } from "next";

let clients: NextApiResponse[] = []; // Store active clients

const stack = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.socket.setTimeout(0);
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-open",
      "Content-Encoding": "none",
    });

    if (stack.length) {
      res.write(`data: ${JSON.stringify(stack)}\n\n`);
    }

    clients.push(res);

    // Remove client on disconnect
    req.on("close", () => {
      clients = clients.filter((client) => client !== res);
      res.end();
    });
  } else if (req.method === "POST") {
    const message = req.body.message;
    const dr = req.body.dr;

    if (message === "ADVANCE") {
      stack.shift();
    } else if (dr) {
      stack.unshift({ message, dr });
    } else if (message) {
      stack.push({ message });
    }

    // Send data to all connected clients
    clients.forEach((client) => {
      client.write(`data: ${JSON.stringify(stack)}\n\n`);
    });

    res.status(200).send("Message sent to SSE clients");
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
