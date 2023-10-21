import { Card } from "@/types/data";
import db from "lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Card[]>
) {
  if (req.method === "POST") {
    const result = db
      .prepare(
        `REPLACE INTO cards(id, creationTime, content, x, y)
      VALUES($id, $creationTime, $content, $x, $y)
      `
      )
      .run(req.body);
    console.log(result);
    res.status(200).json([]);
    return;
  }
  res.status(400);
}
