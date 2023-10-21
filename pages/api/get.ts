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
    return;
  }
  res.status(400).end();
}
