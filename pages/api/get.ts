import { Card } from "@/types/data";
import db from "lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Card[]>
) {
  if (req.method === "GET") {
    const results: Card[] = db.prepare("SELECT * from cards").all() as any;
    res.status(200).json(results);
  } else if (req.method === "POST") {
    console.log({ body: req.body });
    const result = db
      .prepare(
        `REPLACE INTO cards(id, creationTime, content, x, y)
      VALUES($id, $creationTime, $content, $x, $y)
      `
      )
      .run({
        id: undefined,
        creationTime: 1234,
        content: "hello",
        x: 1,
        y: 1,
      });
    console.log(result);
    // should be an update query usually
    // await db.run(
    //   "INSERT INTO cards VALUES($creator $creationTime $title $text)",
    //   req.body
    // );

    res.status(200).json([]);
  }
}
